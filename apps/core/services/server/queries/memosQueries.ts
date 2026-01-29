import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../../shemaParser';
import { serverFetch } from '@core/libs/api/server-fetcher';
import {
  allPortfolioDetailedListSchema,
  memoFormListSchema,
  memoFormSchema,
  memoRecentListSchema,
  memoTileListSchema,
  memoTileSchema,
} from '@core/schemas/features/memos/memos.schema';
import { PortfolioTypeValue } from '@core/types';
import type { MemoClientQueryService } from '@core/services/client';

export interface MemoServerQueryService {
  getMemoRecents: MemoClientQueryService['getMemoRecents'];
  // (
  //   ...params: any
  // ) => Promise<Response<z.infer<typeof memoRecentListSchema>>>;
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

const memoServices: MemoServerQueryService = {
  getMemoRecents: async (
    targetId?: string,
    portfolioType?: PortfolioTypeValue
  ) => {
    const params = `?portfolioType=${portfolioType}&targetId=${targetId}`;
    const res = await schemaParser(
      serverFetch(`/api/memos/recents${params}`),
      memoRecentListSchema
    );
    return res;
  },
  getAllPortfolios: async () => {
    const res = await schemaParser(
      serverFetch(`/api/portfolios`),
      allPortfolioDetailedListSchema
    );
    return res;
  },
  getMemoFormById: async (memoId: string) => {
    const res = await schemaParser(
      serverFetch(`/api/memos/${memoId}`),
      memoFormSchema
    );
    return res;
  },
  getMemos: async (params?: string) => {
    const res = await schemaParser(
      serverFetch(`/api/memos${params ? `?${params}` : ''}`),
      memoTileListSchema
    );
    return res;
  },
};

export const { getMemoRecents, getAllPortfolios, getMemoFormById, getMemos } =
  memoServices;
