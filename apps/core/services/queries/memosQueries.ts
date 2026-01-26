import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../shemaParser';
import { unifiedFetcher } from '@core/libs/api/unified-fetcher';
import {
  allPortfolioDetailedListSchema,
  memoFormListSchema,
} from '@core/schemas/features/memos/memos.schema';
import { PortfolioTypeValue } from '@core/types';

export interface MemoQueryService {
  getMemoRecents: (
    ...params: any
  ) => Promise<Response<z.infer<typeof memoFormListSchema>>>;
  getAllPortfolios: (
    ...params: any
  ) => Promise<Response<z.infer<typeof allPortfolioDetailedListSchema>>>;
}

const memoServices: MemoQueryService = {
  getMemoRecents: async (
    targetId?: string,
    portfolioType?: PortfolioTypeValue
  ) => {
    const params = `?portfolioType=${portfolioType}&targetId=${targetId}`;
    const res = await schemaParser(
      unifiedFetcher(`/api/memos/recents${params}`),
      memoFormListSchema
    );
    return res;
  },
  getAllPortfolios: async () => {
    const res = await schemaParser(
      unifiedFetcher(`/api/portfolios`),
      allPortfolioDetailedListSchema
    );
    return res;
  },
};

export const { getMemoRecents, getAllPortfolios } = memoServices;
