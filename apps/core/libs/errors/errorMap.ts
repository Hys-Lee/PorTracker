import { ApiError, AppError, NetworkError, UnknownError } from './errors';

export const normalizeError = (error: unknown) => {
  if (error instanceof AppError) {
    return error;
  }

  if (
    error instanceof TypeError ||
    (error instanceof Error && error.name === 'TimeoutError')
  ) {
    return new NetworkError();
  }

  return new UnknownError(error instanceof Error ? error.message : undefined);
};
