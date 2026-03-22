import { Response } from '@core/types/api';
import { ZodSchema, z } from 'zod';
import { logErrors } from './utils/errorLogger';
const schemaParser = async <T extends ZodSchema>(
  promise: Promise<Response<any>>,
  schema: T
): Promise<Response<z.infer<T>>> => {
  const promiseRes = await promise;

  if (!promiseRes.success) {
    logErrors(promiseRes.error);
    return promiseRes;
  }

  const parseRes = schema.safeParse(promiseRes.data);

  if (!parseRes.success) {
    if (typeof window === 'undefined') {
      console.error('[ZOD-SERVER] parse error', parseRes.error);
    } else {
      console.error('[ZOD-CLIENT] parse error', parseRes.error);
    }

    // logErrors(parseRes.error);
    return {
      data: null,
      error: {
        ...parseRes.error,
        type: 'VALIDATION_ERROR',
        message: 'parse error',
      },
      success: false,
    };
  }

  return {
    data: parseRes.data,
    error: null,
    success: true,
  };
};

export { schemaParser };
