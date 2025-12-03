import axios, { AxiosResponse } from 'axios';
import makeFetch from './template';
import { RealPortfolioOriginal } from 'src/shared/types/RealPortfolio';

type GetActualsParam = {
  startDate?: Date;
  endDate?: Date;
  assetIds?: number[];
  transactionType?: string;
  size: number; // 체크
  page?: number; // 체크 - 첫 요청 체크용
  id?: number; //체크 - 커서 기반 요청용
};

// type AssetMappingDataType = {
//   idToName: {
//     [id: number]: string;
//   };
//   nameToId: {
//     [name: string]: number;
//   };
// };
type LatestAssetsDataType = {
  asset_id: number;
  asset: { name: string };
  created_at: string;
  accumulated_shares: number;
  has_positive_shares: boolean;
  latest_price: number;
  latest_realportfolio_id: number;
  updated_at: string;
}[];
type ExchangeRateOfTodayDataType = {
  id: number;
  created_at: string;
  currency_code: string;
  standard_rate: number;
  updated_at: string;
}[];
type ActualDataResponse = {
  data: RealPortfolioOriginal[];
  //  {
  //   asset_id: number;
  //   asset: { name: string };
  //   currency: string;
  //   date: string;
  //   exchange_rate: number;
  //   id: number;
  //   price: number;
  //   shares: number;
  //   transaction_type: string;
  //   linked_memo_id: number;
  // }[];
  meta: {
    // assetMappingData?: AssetMappingDataType;
    latestAssetsData?: LatestAssetsDataType;
    exchangeRateOfTodayData?: ExchangeRateOfTodayDataType; // 일단 달러로 고정
    nextCursor: {
      endDate: string;
      id: number;
      size: number;
    } | null;
  };
};

const getActuals = async ({
  startDate,
  endDate,
  assetIds,
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
  const assetIdsQuery =
    assetIds && assetIds.length > 0 ? `assetIds=${assetIds.join(',')}` : '';
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
    assetIdsQuery,
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
    //teset
    console.log('fetch결과: ', res);
    return res.data;
  });

  const res = await fetchActuals();
  return res;
};

export default getActuals;
export type {
  GetActualsParam,
  ActualDataResponse,
  // AssetMappingDataType,
  LatestAssetsDataType,
};
