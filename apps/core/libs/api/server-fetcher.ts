import { headers } from 'next/headers';
import { ApiError } from '../errors/errors';
import { handleApiError } from './error-handler';
import { enableMocking } from '@core/mocks';
import { Response, RestfulMethod } from '@core/types/api';

export async function serverFetch(
  url: string,
  options: Omit<RequestInit, 'method'> & { method: RestfulMethod } = {
    method: 'GET',
  }
): Promise<Response<any>> {
  if (process.env.NODE_ENV === 'development') {
    await enableMocking();
  }
  try {
    const headerList = await headers();
    const cookie = headerList.get('cookie');

    const res = await fetch(
      process.env.INTERNAL_API_URL
        ? `${process.env.INTERNAL_API_URL}${url}`
        : `${'http://localhost:4200'}${url}`,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          Cookie: cookie || '', // 서버에서 쿠키 전달 필수
        },
      }
    );

    if (!res.ok) {
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
    console.error('[server-fetcher Error]: ', url, error);
    return handleApiError(error);
  }
}
