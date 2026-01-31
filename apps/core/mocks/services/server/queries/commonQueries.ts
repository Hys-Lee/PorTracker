import { mockDB as portfolioDB } from '@core/mocks/db/portfoliosDB';
import {
  assetInfoListSchema,
  transactionTypesListSchema,
} from '@core/schemas/features/portfolios/portfolios.schema';
import { CommonQueryService } from '@core/services/server';
import { makeSafeMockReturn } from '../../utils';

const commonServiceMock: CommonQueryService = {
  getTransactionTypes: async () => {
    const transactionTypes = Array.from(portfolioDB.transactionTypes.values());

    const validated = transactionTypesListSchema.safeParse(transactionTypes);

    return makeSafeMockReturn(validated);
  },
  getAssets: async () => {
    const assets = Array.from(portfolioDB.assets.values()).map((data) => ({
      ...data,
    }));

    const validated = assetInfoListSchema.safeParse(assets);
    return makeSafeMockReturn(validated);
  },
};

export const { getAssets, getTransactionTypes } = commonServiceMock;
