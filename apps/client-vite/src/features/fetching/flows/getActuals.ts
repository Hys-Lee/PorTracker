import axios, { AxiosResponse } from 'axios';
import makeFetch from './template';

type GetActualsParam = {
  startDate?: Date;
  endDate?: Date;
  assets?: string[];
  transactionType?: string;
  size: number; // 체크
  page?: number; // 체크 - 첫 요청 체크용
  id?: number; //체크 - 커서 기반 요청용
};

type ActualDataResponse = {
  data: {
    asset: string;
    currency: string;
    date: string;
    exchange_rate: number;
    id: number;
    price: number;
    shares: number;
    accumulated_shares: number;
    transaction_type: string;
  }[];
  meta: {
    total?: number;
    nextCursor: {
      endDate: string;
      id: number;
      size: number;
    };
  };
};

const getActuals = async ({
  startDate,
  endDate,
  assets,
  transactionType,
  size,
  page,
  id,
}: GetActualsParam) => {
  const startDateQuery = startDate
    ? `startDate=${startDate.toISOString()}`
    : '';
  const endDateQuery = endDate ? `endDate=${endDate.toISOString()}` : '';
  const sizeQuery = `size=${size}`;
  const pageQuery = page ? `page=${page}` : '';
  const assetQuery =
    assets && assets.length > 0 ? `asset=${assets.join(',')}` : '';
  const transactionTypeQuery = transactionType
    ? `transactionType=${transactionType}`
    : '';
  const idQuery = id ? `id=${id}` : '';
  //test
  // console.log('IDQUERY: ', id);

  const queryTotal = [
    startDateQuery,
    endDateQuery,
    sizeQuery,
    pageQuery,
    assetQuery,
    transactionTypeQuery,
    idQuery,
  ]
    .filter((queryEle) => queryEle.length > 0)
    .join('&');

  // try {
  //   const res = await axios.get(
  //     `${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/portfolio?${queryTotal}`
  //   );
  //   //test
  //   console.log('RES: ', res);
  //   return res.data;
  // } catch (e) {
  //   console.error('와우 : ', e);
  // }

  const fetchActuals = makeFetch(async () => {
    const res = await axios.get<ActualDataResponse>(
      `${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/portfolio?${queryTotal}`
    );
    return res.data;
  });

  const res = await fetchActuals();
  return res;
};

export default getActuals;
export type { GetActualsParam, ActualDataResponse };
