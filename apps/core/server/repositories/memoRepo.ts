import { internalServerFetch } from '@core/libs/api/server-fetcher';
import { handleInternalError } from './utils/errorHandler';
import { BodyTypeOf } from './types/BodyTypeOf';
import { ParameterTypeOf } from './types/ParameterTypeOf';

export const memoRepository = {
  getMemo: async (publicId: string) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/memos/{publicId}',
      {
        params: { path: { publicId } },
      }
    );
    handleInternalError(error);
    return data;
  },
  updateMemo: async (
    publicId: string,
    body: BodyTypeOf<'/api/v1/memos/{publicId}', 'put'>
  ) => {
    const { data, error } = await internalServerFetch.PUT(
      '/api/v1/memos/{publicId}',
      {
        params: { path: { publicId } },
        body,
      }
    );
    handleInternalError(error);
    return data;
  },
  deleteMemo: async (publicId: string) => {
    const { data, error } = await internalServerFetch.DELETE(
      '/api/v1/memos/{publicId}',
      {
        params: { path: { publicId } },
      }
    );
    handleInternalError(error);
    return data;
  },
  patchMemo: async (
    publicId: string,
    body: BodyTypeOf<'/api/v1/memos/{publicId}', 'patch'>
  ) => {
    const { data, error } = await internalServerFetch.PATCH(
      '/api/v1/memos/{publicId}',
      {
        params: {
          path: { publicId },
        },
        body,
      }
    );
    handleInternalError(error);
    return data;
  },
  getAllMemos: async () => {
    const { data, error } = await internalServerFetch.GET('/api/v1/memos');
    handleInternalError(error);
    return data;
  },
  addMemo: async (body: BodyTypeOf<'/api/v1/memos', 'post'>) => {
    const { data, error } = await internalServerFetch.POST('/api/v1/memos', {
      body,
    });
    handleInternalError(error);
    return data;
  },
  getMemosBulk: async (publicIds: string[]) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/memos/bulk',
      {
        params: { query: { publicIds } },
      }
    );
    handleInternalError(error);
    return data;
  },
  searchMemo: async (
    params: ParameterTypeOf<'/api/v1/memos/search', 'get'>
  ) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/memos/search',
      {
        params: {
          query: {
            ...params,
          },
        },
      }
    );
    handleInternalError(error);
    return data;
  },
  getRecentMemosByAssetId: async (
    assetId: string,
    params: ParameterTypeOf<'/api/v1/memos/recent/asset/{assetPublicId}', 'get'>
  ) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/memos/recent/asset/{assetPublicId}',
      { params: { query: { ...params }, path: { assetPublicId: assetId } } }
    );
    handleInternalError(error);
    return data;
  },
};
