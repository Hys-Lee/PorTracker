import { enableMocking } from '@core/mocks';
import { ApiError, AppError } from '../errors/errors';
import { handleApiError } from './error-handler';
import { Response, RestfulMethod } from '@core/types/api';

export async function clientFetch(
  url: string,
  options: Omit<RequestInit, 'method'> & { method: RestfulMethod } = {
    method: 'GET',
  }
): Promise<Response<any>> {
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

    const data = await res.json();
    return { success: true, error: null, data };
  } catch (error) {
    console.error(`[client-fetcher Error]`, url, error);
    return handleApiError(error);
  }
}
