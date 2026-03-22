import { internalServerFetch } from '@core/libs/api/server-fetcher';
import { handleInternalError } from './utils/errorHandler';
import { BodyTypeOf } from './types/BodyTypeOf';
import { ParameterTypeOf } from './types/ParameterTypeOf';

export const targetPortfolioRepository = {
  getTargetPortfolio: async (publicId: string) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/target-portfolios/{publicId}',
      {
        params: { path: { publicId } },
      }
    );
    handleInternalError(error);
    return data;
  },
  updateTargetPortfolio: async (
    publicId: string,
    body: BodyTypeOf<'/api/v1/target-portfolios/{publicId}', 'put'>
  ) => {
    const { data, error } = await internalServerFetch.PUT(
      '/api/v1/target-portfolios/{publicId}',
      {
        params: { path: { publicId } },
        body,
      }
    );
    handleInternalError(error);
    return data;
  },
  deleteTargetPortfolio: async (publicId: string) => {
    const { data, error } = await internalServerFetch.DELETE(
      '/api/v1/target-portfolios/{publicId}',
      {
        params: { path: { publicId } },
      }
    );
    handleInternalError(error);
    return data;
  },
  getTargetPortfolios: async () => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/target-portfolios'
    );
    handleInternalError(error);
    return data;
  },
  addTargetPortfolio: async (
    body: BodyTypeOf<'/api/v1/target-portfolios', 'post'>
  ) => {
    const { data, error } = await internalServerFetch.POST(
      '/api/v1/target-portfolios',
      { body }
    );
    handleInternalError(error);
    return data;
  },
  addSnapshot: async (
    publicId: string,
    body: BodyTypeOf<'/api/v1/target-portfolios/{publicId}/snapshots', 'post'>
  ) => {
    const { data, error } = await internalServerFetch.POST(
      '/api/v1/target-portfolios/{publicId}/snapshots',
      {
        params: { path: { publicId } },
        body,
      }
    );
    handleInternalError(error);
    return data;
  },
  getTargetPortfoliosBulk: async (publicIds: string[]) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/target-portfolios/bulk',
      {
        params: { query: { publicIds } },
      }
    );
    handleInternalError(error);
    return data;
  },
  searchTargetPortfolio: async (
    params: ParameterTypeOf<'/api/v1/target-portfolios/search', 'get'>
  ) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/target-portfolios/search',
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
  addTargetPortfolioWithMemo: async (
    body: BodyTypeOf<'/api/v1/target-portfolios/with-memo', 'post'>
  ) => {
    const { data, error } = await internalServerFetch.POST(
      '/api/v1/target-portfolios/with-memo',
      {
        body,
      }
    );
    handleInternalError(error);
    return data;
  },
  updateTargetPortfolioWithMemo: async (
    publicId: string,
    body: BodyTypeOf<'/api/v1/target-portfolios/{publicId}/with-memo', 'put'>
  ) => {
    const { data, error } = await internalServerFetch.PUT(
      '/api/v1/target-portfolios/{publicId}/with-memo',
      {
        params: { path: { publicId } },
        body,
      }
    );
    handleInternalError(error);
    return data;
  },
};
