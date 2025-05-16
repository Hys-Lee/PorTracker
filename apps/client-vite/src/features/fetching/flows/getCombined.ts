import axios from 'axios';
import makeFetch from './template';
import { RealPortfolioWithAssetInfo } from 'src/shared/types/RealPortfolio';
import { MemoOriginal } from 'src/shared/types/Memos';

type CombinedResponse = {
  data: Array<RealPortfolioWithAssetInfo & { linkedMemo: MemoOriginal }>;
};

const getCombined = async (
  date?: Date,
  assetId?: number,
  transactionType?: string
) => {
  const dateQuery = date ? `date=${date.toISOString()}` : '';
  const assetQuery = assetId ? `assetId=${assetId}` : '';
  const transactionTypeQuery = transactionType
    ? `transactionType=${transactionType}`
    : '';

  const queryTotal = [dateQuery, assetQuery, transactionTypeQuery]
    .filter((queryEle) => queryEle.length > 0)
    .join('&');

  const fetchCombined = makeFetch(async () => {
    const res = await axios.get<CombinedResponse>(
      `${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/combined?${queryTotal}`
    );
    //test
    console.log('getcombinded res: ', res);
    return res.data;
  });
  const res = await fetchCombined();

  return res;
};

export default getCombined;
