import { AxiosError } from 'axios';

const makeFetch =
  <T>(successFetchFunc: () => Promise<T>) =>
  async () => {
    try {
      const res = await successFetchFunc();
      return res;
    } catch (error) {
      if (!(error instanceof AxiosError) || !error.status) {
        console.error('Axios에러에서 벗어남!');
        throw new Error('확인되지 않은 페치 에러!');
      }

      if (error.status < 400) {
        console.log('상태코드: 3XX');
      }
      console.error(error);
      throw error;
    }
  };

export default makeFetch;
