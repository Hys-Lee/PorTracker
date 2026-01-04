import { Response } from '@core/types/api';
import { ZodSchema, z } from 'zod';
const schemaParser = async <T extends ZodSchema>(
  promise: Promise<Response<any>>,
  schema: T
): Promise<Response<z.infer<T>>> => {
  const promiseRes = await promise;

  //test
  console.log('promiseRes: ', promiseRes);

  if (!promiseRes.success) return promiseRes;

  const parseRes = schema.safeParse(promiseRes.data);

  if (!parseRes.success) {
    if (typeof window === 'undefined') {
      console.error('[ZOD-SERVER] parse error');
    } else {
      console.error('[ZOD-CLIENT] parse error');
    }
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
