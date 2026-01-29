import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../../shemaParser';
import { clientFetch } from '@core/libs/api/client-fetcher';
import { memoRecentListSchema } from '@core/schemas/features/memos/memos.schema';
import { PortfolioTypeValue } from '@core/types';

export interface MemoClientQueryService {
  getMemoRecents: (
    ...params: any
  ) => Promise<Response<z.infer<typeof memoRecentListSchema>>>;
}

const memoServices: MemoClientQueryService = {
  getMemoRecents: async (
    targetId?: string,
    portfolioType?: PortfolioTypeValue
  ) => {
    const params = `?portfolioType=${portfolioType}&targetId=${targetId}`;
    const res = await schemaParser(
      clientFetch(`/api/memos/recents${params}`),
      memoRecentListSchema
    );
    return res;
  },
};

export const { getMemoRecents } = memoServices;
