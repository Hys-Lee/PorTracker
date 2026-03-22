import {
  actualFormSchema,
  actualPortfolioListSchema,
  // assetInfoListSchema,
  relatedMemoSchema,
  // transactionTypesListSchema,
  actualRecentListsForAssetsSchema,
  relatedMemoListSchema,
  searchActualPortfoliosParamsScehma,
  getActualPorfolioParamsSchema,
  ActualPortfolioSearchParams,
} from '@core/schemas/features/portfolios/portfolios.schema';
import { schemaParser } from '../../shemaParser';
import { Response } from '@core/types/api';
import z from 'zod';
import { actualPortfolioAggregates } from '@core/server/aggregates/portfolios/actualPortfolioAggr';
import { memoAggregates } from '@core/server/aggregates/memos/memoAggr';
import { URLSearchParams } from 'url';
import { MemoSearchParams } from '@core/schemas/features/memos/memos.schema';

export interface ActualPortfolioQueryService {
  getAllActualPortfolios: (
    ...params: any
  ) => Promise<Response<z.infer<typeof actualPortfolioListSchema>>>;
  getActualPortfolioById: (
    ...params: any
  ) => Promise<Response<z.infer<typeof actualFormSchema>>>;
  getRelatedMemoByMemoId: (
    ...params: any
  ) => Promise<Response<z.infer<typeof relatedMemoSchema>>>;
  getRelatedMemos: (
    params?: MemoSearchParams
  ) => Promise<Response<z.infer<typeof relatedMemoListSchema>>>;
  getActualPortfolioRecentsOfAll: (
    ...params: any
  ) => Promise<Response<z.infer<typeof actualRecentListsForAssetsSchema>>>;
}

const actualPortfolioService: ActualPortfolioQueryService = {
  /** Actual */

  getAllActualPortfolios: async (params?: ActualPortfolioSearchParams) => {
    // const paramsObj = Object.fromEntries(params?.entries() || []);
    const res = await schemaParser(
      // serverFetch(`/api/portfolios/actuals${params ? `?${params}` : ''}`),
      actualPortfolioAggregates.getActualPortfolios({ ...params }),
      actualPortfolioListSchema
    );
    return res;
  },

  getActualPortfolioById: async (actualId: string) => {
    const res = await schemaParser(
      // serverFetch(`/api/portfolios/actuals/${actualId}`),
      actualPortfolioAggregates.getActualPortfolioFormById(actualId),
      actualFormSchema
    );
    return res;
  },

  getRelatedMemoByMemoId: async (memoId: string) => {
    const res = await schemaParser(
      // serverFetch(`/api/memos/related-memos/${memoId}`),
      memoAggregates.getMemoFormById(memoId), // 일반 memo by id로도 될 것 같은데?. 엄밀하게 말하면 아닐지모르지만, 덕타이핑상 가능하고, 실제 서비스 생각해보면... 아닌가? 서비스 맥략을 생각해보면 이니 임자 있는 메모가 검색되지는 않겠지만, 맥락 없이 그냥 이 메서드에 대해선 임자 있는 메모가 나올 순 있고, 그러면 다른 actual이랑 연결하게 되면 임자 값이 교체될 것 같은데.
      relatedMemoSchema
    );
    return res;
  },
  getRelatedMemos: async (params?: MemoSearchParams) => {
    //test
    const testres = await memoAggregates.getMemos({ ...params });
    console.log('getmemos in getrealtedmemos testres: ', testres);

    const res = await schemaParser(
      // serverFetch(`/api/memos/related-memos`),
      memoAggregates.getMemos({ ...params }),
      relatedMemoListSchema
    );
    return res;
  },
  getActualPortfolioRecentsOfAll: async () => {
    const res = await schemaParser(
      // serverFetch(`/api/portfolios/recents`),
      actualPortfolioAggregates.getAllRecentActualPortfolios(),
      actualRecentListsForAssetsSchema
    );
    return res;
  },
};

export const {
  getActualPortfolioById,
  getAllActualPortfolios,
  getRelatedMemoByMemoId,
  getRelatedMemos,
  getActualPortfolioRecentsOfAll,
} = actualPortfolioService;
