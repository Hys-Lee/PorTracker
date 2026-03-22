import { AssetInfos } from '@core/schemas/features/commons/assets.schema';
import { Response } from '@core/types/api';
import { aggregateErrorHandler } from '../utils/aggregateErrorHandler';
// import { assetTypeRepository } from '@core/server/repositories/assetTypeRepo';
import { getAssetTypes, getAssets } from '@core/server/repositories';

export const assetAggregates = {
  getAssets: async (): Promise<Response<AssetInfos>> => {
    try {
      const [assets, assetTypes] = await Promise.all([
        getAssets(),
        getAssetTypes(),
      ]);

      return {
        data:
          assets?.map((data) => ({
            createdAt: new Date(data.createdAt || ''),
            id: data.id || '',
            name: data.name || '',
            type:
              assetTypes?.find((typeInfo) => typeInfo.id === data.typeId)
                ?.name || '',
            description: data.description,
          })) || [],
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },
};
