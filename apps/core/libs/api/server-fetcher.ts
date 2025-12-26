import { headers } from 'next/headers';
import { ApiError } from '../errors/errors';
import { handleApiError } from './error-handler';

export async function serverFetch(url: string, options: RequestInit = {}) {
  try {
    const headerList = await headers();
    const cookie = headerList.get('cookie');

    const res = await fetch(`${process.env.INTERNAL_API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Cookie: cookie || '', // 서버에서 쿠키 전달 필수
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new ApiError(
        errorData.message || 'API Error occured',
        errorData.code || '',
        res.status
      );
    }
    return res.json();
  } catch (error) {
    handleApiError(error);
  }
}
