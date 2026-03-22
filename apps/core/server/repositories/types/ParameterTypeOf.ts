import { paths } from '@core/server/types/generated/be-api-schema';
import { FetchOptions } from 'openapi-fetch';

// export type ParameterTypeOf<
//   P extends keyof paths,
//   M extends keyof paths[P]
// > = paths[P][M] extends { parameters: { query: infer B } } ? B : never;

export type ParameterTypeOf<
  P extends keyof paths,
  M extends keyof paths[P]
> = NonNullable<FetchOptions<paths[P][M]>['params']>['query'];
