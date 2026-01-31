// import type {  } from '@core/types/api';

import { ApiErrorRes, Response } from '@core/types/api';
import { normalizeError } from '../errors/errorMap';
import {
  ApiError,
  AppError,
  NetworkError,
  UnknownError,
} from '../errors/errors';

export function handleApiError<T>(error: unknown): Response<T> {
  const customError = normalizeError(error);

  // 기본이 App Error
  const finalError: Response<T>['error'] = {
    code: customError.code,
    message: customError.message,
    type: 'APP_ERROR',
  };

  if (customError instanceof ApiError) {
    finalError.type = 'HTTP_ERROR';
    finalError.status = customError.status;
    finalError.details = customError.details;
  } else if (customError instanceof NetworkError) {
    finalError.type = 'NETWORK_ERROR';
  } else if (customError instanceof UnknownError) {
    finalError.type = 'UNKNOWN_ERROR';
  }
  //test
  console.error(finalError);
  return {
    data: null,
    success: false,
    error: finalError,
  };
}
