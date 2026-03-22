import { ApiError } from '@core/libs/errors/errors';
import { components } from '@core/server/types/generated/be-api-schema';
export type InternalApiError = components['schemas']['ErrorResponse'];

export const handleInternalError = (error?: InternalApiError) => {
  if (error) {
    throw new ApiError(
      error.message || '에러 내용을 확인할 수 없습니다.',
      error.code || 'UNKNOWN_ERROR',
      error.status || 500,
      error.detail
    );
  }
};
