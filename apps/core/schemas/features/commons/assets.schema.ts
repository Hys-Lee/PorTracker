import { assetInfoSchema } from '@core/schemas/domains/asset.schema';
import { z } from 'zod';

export const assetInfoListSchema = z.array(assetInfoSchema);

export type AssetInfos = z.infer<typeof assetInfoListSchema>;
