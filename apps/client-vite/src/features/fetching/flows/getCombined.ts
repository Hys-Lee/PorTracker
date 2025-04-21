import axios from 'axios';
import makeFetch from './template';

const getCombined = (date?: Date, asset?: string, transactionType?: string) => {
  const dateQuery = date ? `date=${date}` : '';
  const assetQuery = asset ? `asset=${asset}` : '';
  const transactionTypeQuery = transactionType
    ? `transactionType=${transactionType}`
    : '';

  const queryTotal = [dateQuery, assetQuery, transactionTypeQuery]
    .filter((queryEle) => queryEle.length > 0)
    .join('&');

  makeFetch(async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/combined?${queryTotal}`
    );
    return res.data;
  });
};

export default getCombined;
