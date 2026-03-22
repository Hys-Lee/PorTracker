import { paths } from '@core/server/types/generated/be-api-schema';
import type { FetchResponse } from 'openapi-fetch';

export type BodyTypeOf<
  P extends keyof paths,
  M extends keyof paths[P]
> = paths[P][M] extends {
  requestBody: { content: { 'application/json': infer B } };
}
  ? B
  : never;
