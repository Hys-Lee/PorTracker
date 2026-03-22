import { getUserId, internalServerFetch } from '@core/libs/api/server-fetcher';
import { handleInternalError } from './utils/errorHandler';
import { BodyTypeOf } from './types/BodyTypeOf';
import { paths } from '../types/generated/be-api-schema';
import { FetchOptions } from 'openapi-fetch';
import { OtherOptionsTypeOf } from './types/OtherOptionsTypeOf';
import { fetchTagKeyFactory } from './utils/fetchTagKeyFactory';

export const currencyRepository = {
  getCurrencies: async (
    options?: OtherOptionsTypeOf<'/api/v1/currencies', 'get'>
  ) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.GET(
      '/api/v1/currencies',
      {
        next: {
          tags: fetchTagKeyFactory.currencies(userId),
          revalidate: 3600 * 12,
        },
        ...options,
      }
    );
    handleInternalError(error);
    return data;
  },
  addCurrency: async (body: BodyTypeOf<'/api/v1/currencies', 'post'>) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.POST(
      '/api/v1/currencies',
      {
        body,
        next: {
          tags: fetchTagKeyFactory.currencies(userId),
        },
      }
    );
    handleInternalError(error);
    return data;
  },
  updateCurrency: async (
    publicId: string,
    body: BodyTypeOf<'/api/v1/currencies/{publicId}', 'put'>
  ) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.PUT(
      '/api/v1/currencies/{publicId}',
      {
        params: { path: { publicId } },
        body,
        next: {
          tags: fetchTagKeyFactory.currencies(userId),
        },
      }
    );
    handleInternalError(error);
    return data;
  },
  deleteCurrency: async (publicId: string) => {
    const userId = await getUserId();
    const { data, error } = await internalServerFetch.DELETE(
      '/api/v1/currencies/{publicId}',
      {
        params: { path: { publicId } },
        next: {
          tags: fetchTagKeyFactory.currencies(userId),
        },
      }
    );
    handleInternalError(error);
    return data;
  },
};
