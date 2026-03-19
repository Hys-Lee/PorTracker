import { transactionTypesListSchema } from '@core/schemas/features/portfolios/portfolios.schema';
import { assetInfoListSchema } from '@core/schemas/features/commons/assets.schema';
import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../../shemaParser';

import { assetAggregates } from '@core/server/aggregates/commons/assetAggr';

export interface CommonQueryService {
  getAssets: () => Promise<Response<z.infer<typeof assetInfoListSchema>>>;
}

const commonServices = {
  getAssets: async () => {
    const res = await schemaParser(
      // serverFetch('/api/assets'),
      assetAggregates.getAssets(),
      assetInfoListSchema
    );
    return res;
  },
};

export const { getAssets } = commonServices;
