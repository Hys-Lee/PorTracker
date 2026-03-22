import { paths } from '@core/server/types/generated/be-api-schema';
import { FetchOptions } from 'openapi-fetch';

export type OtherOptionsTypeOf<
  P extends keyof paths,
  M extends keyof paths[P]
> = Omit<FetchOptions<paths[P][M]>, 'body' | 'params'>;
