import { serverFetch } from '@core/libs/api/server-fetcher';
import { unifiedFetcher } from '@core/libs/api/unified-fetcher';
import {
  actualFormSchema,
  actualPortfolioListSchema,
  assetInfoListSchema,
  relatedMemoSchema,
  transactionTypesListSchema,
  actualRecentListsForAssetsSchema,
} from '@core/schemas/features/portfolios/portfolios.schema';
import { schemaParser } from '../shemaParser';
import { Response } from '@core/types/api';
import z from 'zod';

export interface ActualPortfolioQueryService {
  getTransactionTypes: (
    ...params: any
  ) => Promise<Response<z.infer<typeof transactionTypesListSchema>>>;
  getAssets: () => Promise<Response<z.infer<typeof assetInfoListSchema>>>;
  getAllActualPortfolios: (
    ...params: any
  ) => Promise<Response<z.infer<typeof actualPortfolioListSchema>>>;
  getActualPortfolioById: (
    ...params: any
  ) => Promise<Response<z.infer<typeof actualFormSchema>>>;
  getRelatedMemoByMemoId: (
    ...params: any
  ) => Promise<Response<z.infer<typeof relatedMemoSchema>>>;
  getActualPortfolioRecents: (
    ...params: any
  ) => Promise<Response<z.infer<typeof actualRecentListsForAssetsSchema>>>;
}

const actualPortfolioService: ActualPortfolioQueryService = {
  getTransactionTypes: async () => {
    const res = await schemaParser(
      unifiedFetcher('/api/transaction-types'),
      transactionTypesListSchema
    );
    return res;
  },

  getAssets: async () => {
    const res = await schemaParser(
      unifiedFetcher('/api/assets'),
      assetInfoListSchema
    );
    return res;
  },

  /** Actual */

  getAllActualPortfolios: async (params?: string) => {
    const res = await schemaParser(
      unifiedFetcher(`/api/portfolios/actuals${params ? `?${params}` : ''}`),
      actualPortfolioListSchema
    );
    return res;
  },

  getActualPortfolioById: async (actualId: string) => {
    const res = await schemaParser(
      unifiedFetcher(`/api/portfolios/actuals/${actualId}`),
      actualFormSchema
    );
    return res;
  },

  getRelatedMemoByMemoId: async (memoId: string) => {
    const res = await schemaParser(
      unifiedFetcher(`/api/memos/related-memos/${memoId}`),
      relatedMemoSchema
    );
    return res;
  },
  getActualPortfolioRecents: async () => {
    const res = await schemaParser(
      unifiedFetcher(`/api/portfolios/recents`),
      actualRecentListsForAssetsSchema
    );
    return res;
  },
};

export const {
  getActualPortfolioById,
  getAllActualPortfolios,
  getAssets,
  getRelatedMemoByMemoId,
  getTransactionTypes,
  getActualPortfolioRecents,
} = actualPortfolioService;

// export const getTransactionTypes = async () => {
//   const res = await schemaParser(
//     unifiedFetcher('/api/transaction-types'),
//     transactionTypesListSchema
//   );
//   return res;
// };

// export const getAssets = async () => {
//   const res = await schemaParser(
//     unifiedFetcher('/api/assets'),
//     assetInfoListSchema
//   );
//   return res;
// };

// export const getAllActualPortfolios = async () => {
//   const res = await schemaParser(
//     unifiedFetcher('/api/portfolios/actuals'),
//     actualPortfolioListSchema
//   );
//   return res;
// };

// export const getActualPortfolioById = async (actualId: string) => {
//   const res = await schemaParser(
//     unifiedFetcher(`/api/portfolios/actuals/${actualId}`),
//     actualFormSchema
//   );
//   return res;
// };

// export const getRelatedMemoByMemoId = async (memoId: string) => {
//   const res = await schemaParser(
//     unifiedFetcher(`/api/memos/related-memos/${memoId}`),
//     relatedMemoSchema
//   );
//   return res;
// };
