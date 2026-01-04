import { ApiError, AppError } from '../errors/errors';
import { handleApiError } from './error-handler';

export async function clientFetch(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}${url}`
        : url,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        // 클라이언트는 쿠키가 자동으로 포함됨 (기본값)
      }
    );
    //tset
    console.log('클라: url, res: ', url, res);

    if (!res.ok) {
      // 공통 에러 핸들러 호출
      // const errorData = await res.json();
      // throw new Error(errorData.message || 'Fetching error occured');
      const errorData = await res.json();
      throw new ApiError(
        errorData.message || 'API Error occured',
        errorData.code || '',
        res.status
      );
    }

    return await res.json();
  } catch (error) {
    return handleApiError(error);
  }
}
