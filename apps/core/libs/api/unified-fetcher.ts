import { Response } from '@core/types/api';
import { clientFetch } from './client-fetcher';
import { serverFetch } from './server-fetcher';

type UnifiedFetcherParams = typeof window extends 'undefined'
  ? Parameters<typeof serverFetch>
  : Parameters<typeof clientFetch>;

const unifiedFetcher = (
  ...params: UnifiedFetcherParams
): Promise<Response<any>> => {
  if (typeof window === 'undefined') {
    return serverFetch(...params);
  } else {
    return clientFetch(...params);
  }
};
export { unifiedFetcher };
