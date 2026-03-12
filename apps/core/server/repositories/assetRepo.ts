import { getUserId, internalServerFetch } from '@core/libs/api/server-fetcher';
import { handleInternalError } from './utils/errorHandler';
import { BodyTypeOf } from './types/BodyTypeOf';
import { OtherOptionsTypeOf } from './types/OtherOptionsTypeOf';
import { fetchTagKeyFactory } from './utils/fetchTagKeyFactory';

export const assetRepository = {
  updateAsset: async (
    publicId: string,
    body: BodyTypeOf<'/api/v1/assets/{publicId}', 'put'>
  ) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.PUT(
      '/api/v1/assets/{publicId}',
      {
        params: { path: { publicId } },
        body,
        next: {
          tags: fetchTagKeyFactory.assets(userId),
        },
      }
    );
    handleInternalError(error);

    return data;
  },
  deleteAsset: async (publicId: string) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.DELETE(
      '/api/v1/assets/{publicId}',
      {
        params: { path: { publicId } },
        next: {
          tags: fetchTagKeyFactory.assets(userId),
        },
      }
    );
    handleInternalError(error);
    return data;
  },
  getAssets: async (options?: OtherOptionsTypeOf<'/api/v1/assets', 'get'>) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.GET('/api/v1/assets', {
      next: {
        tags: fetchTagKeyFactory.assets(userId),
        revalidate: 3600 * 12,
      },
      ...options,
    });
    handleInternalError(error);

    return data;
  },
  addAsset: async (body: any) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.POST('/api/v1/assets', {
      body,
      next: {
        tags: fetchTagKeyFactory.assets(userId),
      },
    });
    handleInternalError(error);
    return data;
  },
  getAssetsBulk: async (
    publicIds: string[],
    options?: OtherOptionsTypeOf<'/api/v1/assets/bulk', 'get'>
  ) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/assets/bulk',
      {
        ...options,
        params: { query: { publicIds } },
      }
    );
    handleInternalError(error);
    return data;
  },
};
