import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../shemaParser';
import { unifiedFetcher } from '@core/libs/api/unified-fetcher';
import {
  allPortfolioDetailedListSchema,
  memoFormListSchema,
  memoFormSchema,
  memoRecentListSchema,
  memoTileListSchema,
  memoTileSchema,
} from '@core/schemas/features/memos/memos.schema';
import { PortfolioTypeValue } from '@core/types';

export interface MemoQueryService {
  getMemoRecents: (
    ...params: any
  ) => Promise<Response<z.infer<typeof memoRecentListSchema>>>;
  getAllPortfolios: (
    ...params: any
  ) => Promise<Response<z.infer<typeof allPortfolioDetailedListSchema>>>;
  getMemoFormById: (
    ...params: any
  ) => Promise<Response<z.infer<typeof memoFormSchema>>>;
  getMemos: (
    ...params: any
  ) => Promise<Response<z.infer<typeof memoTileListSchema>>>;
}

const memoServices: MemoQueryService = {
  getMemoRecents: async (
    targetId?: string,
    portfolioType?: PortfolioTypeValue
  ) => {
    const params = `?portfolioType=${portfolioType}&targetId=${targetId}`;
    const res = await schemaParser(
      unifiedFetcher(`/api/memos/recents${params}`),
      memoRecentListSchema
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
  getMemoFormById: async (memoId: string) => {
    const res = await schemaParser(
      unifiedFetcher(`/api/memos/${memoId}`),
      memoFormSchema
    );
    return res;
  },
  getMemos: async (params?: string) => {
    const res = await schemaParser(
      unifiedFetcher(`/api/memos${params ? `?${params}` : ''}`),
      memoTileListSchema
    );
    return res;
  },
};

export const { getMemoRecents, getAllPortfolios, getMemoFormById, getMemos } =
  memoServices;
