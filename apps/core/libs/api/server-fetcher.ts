import { headers } from 'next/headers';
import { ApiError } from '../errors/errors';
import { handleApiError } from './error-handler';
import { enableMocking } from '@core/mocks';
import { Response, RestfulMethod } from '@core/types/api';
import { createClient as createSupabaseClient } from '../supabase/server';
import createClient from 'openapi-fetch';
import type { paths } from '@core/server/types/generated/be-api-schema';

export const internalServerFetch = createClient<paths>({
  baseUrl: process.env.INTERNAL_API_URL || 'http://localhost:4200',
  fetch: fetch,
});

internalServerFetch.use({
  onRequest: async ({ request }) => {
    // 이 안에다가 supabase sdk이용한 헤더 처리

    const supabase = await createSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    const headerList = await headers();
    const cookie = headerList.get('cookie');

    request.headers.set('Content-Type', 'application/json');
    request.headers.set('Cookie', cookie || '');

    accessToken &&
      request.headers.set('Authorization', `Bearer ${accessToken}`);
  },
});

export const getUserId = async () => {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id;
};

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
    const supabase = await createSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

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
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
