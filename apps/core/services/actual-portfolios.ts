'use server';

import { serverFetch } from '@core/libs/api/server-fetcher';
import { unifiedFetcher } from '@core/libs/api/unified-fetcher';
import {
  actualFormSchema,
  actualPortfolioListSchema,
  actualPortfolioSchema,
  assetInfoListSchema,
  assetInfoSchema,
  relatedMemoSchema,
  transactionTypesListSchema,
  transactionTypesSchema,
} from '@core/schemas/portfolios.schema';
import { schemaParser } from './shemaParser';

export const getTransactionTypes = async () => {
  const res = await schemaParser(
    unifiedFetcher('/api/assets'),
    transactionTypesListSchema
  );
  return res;
};

export const getAssets = async () => {
  const res = await schemaParser(
    unifiedFetcher('/api/assets'),
    assetInfoListSchema
  );
  return res;
};

export const getAllActualPortfolios = async () => {
  const res = await schemaParser(
    unifiedFetcher('/api/portfolios/actuals'),
    actualPortfolioListSchema
  );
  return res;
};

export const getActualPortfolioById = async (actualId: string) => {
  const res = await schemaParser(
    unifiedFetcher(`/api/portfolios/actuals/${actualId}`),
    actualFormSchema
  );
  return res;
};

export const getRelatedMemoByMemoId = async (memoId: string) => {
  const res = await schemaParser(
    unifiedFetcher(`/api/memos/related-memos/${memoId}`),
    relatedMemoSchema
  );
  return res;
};
