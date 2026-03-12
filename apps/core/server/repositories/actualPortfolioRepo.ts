import { internalServerFetch } from '@core/libs/api/server-fetcher';
import { handleInternalError } from './utils/errorHandler';
import { BodyTypeOf } from './types/BodyTypeOf';
import { OtherOptionsTypeOf } from './types/OtherOptionsTypeOf';
import { paths } from '../types/generated/be-api-schema';
import { ParameterTypeOf } from './types/ParameterTypeOf';

export const actualPortfolioRepository = {
  getActualPortfolio: async (portfolioId: string) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/actual-portfolios/{publicId}',
      {
        params: { path: { publicId: portfolioId } },
      }
    );
    handleInternalError(error);
    return data;
  },
  updateActualPortfolio: async (
    portfolioId: string,
    body: BodyTypeOf<'/api/v1/actual-portfolios/{publicId}', 'put'>
  ) => {
    const { data, error } = await internalServerFetch.PUT(
      '/api/v1/actual-portfolios/{publicId}',
      {
        params: { path: { publicId: portfolioId } },
        body,
      }
    );
    handleInternalError(error);
    return data;
  },
  deleteActualPortfolio: async (portfolioId: string) => {
    const { data, error } = await internalServerFetch.DELETE(
      '/api/v1/actual-portfolios/{publicId}',
      {
        params: { path: { publicId: portfolioId } },
      }
    );
    handleInternalError(error);
    return data;
  },
  getActualPortfolios: async () => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/actual-portfolios'
    );
    handleInternalError(error);
    return data;
  },
  addActualPortfolio: async (
    body: BodyTypeOf<'/api/v1/actual-portfolios', 'post'>
  ) => {
    const { data, error } = await internalServerFetch.POST(
      '/api/v1/actual-portfolios',
      { body }
    );
    handleInternalError(error);
    return data;
  },
  getActualPortfoliosBulk: async (publicIds: string[]) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/actual-portfolios/bulk',
      {
        params: { query: { publicIds } },
      }
    );
    handleInternalError(error);
    return data;
  },
  searchActualPortfolio: async (
    params: ParameterTypeOf<'/api/v1/actual-portfolios/search', 'get'>
  ) => {
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/actual-portfolios/search',
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
};
