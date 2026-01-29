import {
  assetInfoListSchema,
  transactionTypesListSchema,
} from '@core/schemas/features/portfolios/portfolios.schema';
import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../shemaParser';
import { unifiedFetcher } from '@core/libs/api/unified-fetcher';

export interface CommonQueryService {
  getTransactionTypes: (
    ...params: any
  ) => Promise<Response<z.infer<typeof transactionTypesListSchema>>>;
  getAssets: () => Promise<Response<z.infer<typeof assetInfoListSchema>>>;
}

const commonServices = {
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
};

export const { getAssets, getTransactionTypes } = commonServices;
