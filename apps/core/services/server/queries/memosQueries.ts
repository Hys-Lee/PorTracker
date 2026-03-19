import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../../shemaParser';

import {
  allPortfolioDetailedListSchema,
  memoFormListSchema,
  memoFormRequestSchema,
  memoFormSchema,
  memoRecentListSchema,
  MemoSearchParams,
  memoTileListSchema,
  memoTileSchema,
} from '@core/schemas/features/memos/memos.schema';
import { PortfolioTypeValue } from '@core/types';
import type { MemoClientQueryService } from '@core/services/client';
import { memoAggregates } from '@core/server/aggregates/memos/memoAggr';
import {
  actualPortfolioListSchema,
  ActualPortfolioSearchParams,
} from '@core/schemas/features/portfolios/portfolios.schema';
import { actualPortfolioAggregates } from '@core/server/aggregates/portfolios/actualPortfolioAggr';

export interface MemoServerQueryService {
  // getMemoRecents: MemoClientQueryService['getMemoRecents'];
  getMemoRecents: (params: {
    portfolioType?: PortfolioTypeValue;
    assetId?: string;
    targetPortfolioId?: string;
  }) => Promise<Response<z.infer<typeof memoRecentListSchema>>>;
  // (
  //   ...params: any
  // ) => Promise<Response<z.infer<typeof memoRecentListSchema>>>;
  // getAllPortfolios: (
  //   ...params: any
  // ) => Promise<Response<z.infer<typeof allPortfolioDetailedListSchema>>>;
  getMemoFormById: (
    ...params: any
  ) => Promise<Response<z.infer<typeof memoFormSchema>>>;
  getMemos: (
    ...params: any
  ) => Promise<Response<z.infer<typeof memoTileListSchema>>>;
  getUnlinkedPortfolios: () => Promise<
    Response<z.infer<typeof actualPortfolioListSchema>> // target에 대한 스키마도 가질 수 있게 해서 전체 unlinked 포폴 리스트 반환
  >;
}

const memoServices: MemoServerQueryService = {
  getMemoRecents: async (
    // targetId?: string,
    params: {
      portfolioType?: PortfolioTypeValue;
      assetId?: string;
      targetPortfolioId?: string;
    }
  ) => {
    // const params = `?portfolioType=${portfolioType}&targetId=${targetId}`;
    const res = await schemaParser(
      // serverFetch(`/api/memos/recents${params}`),
      // memoAggregates.getMemos({
      //   memoTypes: [portfolioType || 'event'],
      //   targetIds: targetId ? [targetId] : undefined,
      // }),
      memoAggregates.getRecentMemosByParams({
        memoType: params.portfolioType || 'event',
        assetId: params.assetId,
        targetPortfolioId: params.targetPortfolioId,
      }),
      memoRecentListSchema
    );

    return res;
  },
  // getAllPortfolios: async (params?: ActualPortfolioSearchParams) => {
  //   const res = await schemaParser(
  //     // serverFetch(`/api/portfolios`),
  //     actualPortfolioAggregates.getActualPortfolios(params),
  //     allPortfolioDetailedListSchema
  //   );
  //   return res;
  // },
  getMemoFormById: async (memoId: string) => {
    const res = await schemaParser(
      // serverFetch(`/api/memos/${memoId}`),
      memoAggregates.getMemoFormById(memoId),
      memoFormSchema
    );
    return res;
  },
  getMemos: async (params?: MemoSearchParams) => {
    const res = await schemaParser(
      // serverFetch(`/api/memos${params ? `?${params}` : ''}`),
      memoAggregates.getMemos(params),
      memoTileListSchema
    );
    return res;
  },
  getUnlinkedPortfolios: async () => {
    // actual만이 아니라 target에 대해서도 합쳐서 보내줘야 함. 아니면 ui쪽을 좀 손봐주든가. target에 대해서는 따로 만들게.
    const res = await schemaParser(
      actualPortfolioAggregates.getUnlinkedActualPortfolios(),
      actualPortfolioListSchema
    );
    return res;
  },
};

export const {
  getMemoRecents,
  // getAllPortfolios,
  getMemoFormById,
  getMemos,
} = memoServices;
