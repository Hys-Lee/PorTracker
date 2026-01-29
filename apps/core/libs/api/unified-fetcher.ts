import { Response } from '@core/types/api';
import type { clientFetch } from './client-fetcher';
import type { serverFetch } from './server-fetcher';

type UnifiedFetcherParams = typeof window extends 'undefined'
  ? Parameters<typeof serverFetch>
  : Parameters<typeof clientFetch>;

const unifiedFetcher = async (
  ...params: UnifiedFetcherParams
): Promise<Response<any>> => {
  if (typeof window === 'undefined') {
    const { serverFetch } = await import('./server-fetcher');
    return serverFetch(...params);
  } else {
    const { clientFetch } = await import('./client-fetcher');
    return clientFetch(...params);
  }
};
export { unifiedFetcher };
