import { getUserId, internalServerFetch } from '@core/libs/api/server-fetcher';
import { handleInternalError } from './utils/errorHandler';
import { OtherOptionsTypeOf } from './types/OtherOptionsTypeOf';
import { fetchTagKeyFactory } from './utils/fetchTagKeyFactory';
import { BodyTypeOf } from './types/BodyTypeOf';

export const assetTypeRepository = {
  updateAssetType: async (
    publicId: string,
    body: BodyTypeOf<'/api/v1/asset-types/{publicId}', 'put'>
  ) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.PUT(
      '/api/v1/asset-types/{publicId}',
      {
        params: { path: { publicId } },
        body,
        next: {
          tags: fetchTagKeyFactory.assetTypes(userId),
        },
      }
    );
    handleInternalError(error);
    return data;
  },
  deleteAssetType: async (publicId: string) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.DELETE(
      '/api/v1/asset-types/{publicId}',
      {
        params: { path: { publicId } },
        next: {
          tags: fetchTagKeyFactory.assetTypes(userId),
        },
      }
    );
    handleInternalError(error);
    return data;
  },
  getAssetTypes: async (
    options?: OtherOptionsTypeOf<'/api/v1/asset-types', 'get'>
  ) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/asset-types',
      {
        next: {
          tags: fetchTagKeyFactory.assetTypes(userId),
          revalidate: 3600 * 12,
        },
        ...options,
      }
    );
    handleInternalError(error);
    return data;
  },
  addAssetType: async (
    body: BodyTypeOf<'/api/v1/asset-types/{publicId}', 'post'>
  ) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.POST(
      '/api/v1/asset-types',
      {
        body,
        next: {
          tags: fetchTagKeyFactory.assetTypes(userId),
        },
      }
    );
    handleInternalError(error);
    return data;
  },
};
