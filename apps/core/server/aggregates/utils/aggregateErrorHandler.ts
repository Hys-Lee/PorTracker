import { ApiError } from '@core/libs/errors/errors';
import { Response } from '@core/types/api';

export const aggregateErrorHandler = (e: unknown) => {
  if (e instanceof ApiError) {
    return {
      data: null,
      error: {
        message: e.message,
        type: 'HTTP_ERROR' as const,
        code: e.code,
        details: e.details,
        status: e.status,
      },
      success: false as const,
    };
  }
  return {
    data: null,
    error: {
      message: 'unknown error in aggregate',
      type: 'UNKNOWN_ERROR' as const,
      // 나머지도 필요할까?
    },
    success: false as const,
  };
};
