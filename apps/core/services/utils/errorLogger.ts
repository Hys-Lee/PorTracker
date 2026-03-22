// import { ApiError } from '@core/libs/errors/errors';
import { handleApiError } from '@core/libs/api/error-handler';
// import { ApiErrorRes } from '@core/types/api';
import * as Sentry from '@sentry/nextjs';

export const logErrors = (error: unknown) => {
  const typedError = handleApiError(error);
  Sentry.captureException(typedError, {
    tags: { layer: 'BFF(api)' },
    contexts: {
      errorDetails: {
        ...typedError,
      },
      errorOriginal: {
        error,
      },
    },
  });
  console.error('[BFF] Sentry에 Error 정보 전달');
  //   return error;
};
