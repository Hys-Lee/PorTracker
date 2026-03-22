import { internalServerFetch } from '@core/libs/api/server-fetcher';
import { handleInternalError } from './utils/errorHandler';
import { BodyTypeOf } from './types/BodyTypeOf';

export const credentialRepository = {
  updateToken: async (
    body: BodyTypeOf<'/api/v1/credentials/google', 'post'>
  ) => {
    const { data, error } = await internalServerFetch.POST(
      '/api/v1/credentials/google',
      { body }
    );
    handleInternalError(error);
    return data;
  },
};
