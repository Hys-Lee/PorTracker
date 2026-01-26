import z from 'zod';

export const assetInfoSchema = z.object({
  id: z.string().uuid('유효한 데이터가 아닙니다'),
  name: z.string().min(1, '이름은 필수입니다'),
  type: z.string().min(1, '유효한 타입이어야 합니다.'),
  description: z.string().optional(),
  createdAt: z
    .string()
    .datetime()
    .transform((str) => new Date(str)),
});

export type AssetInfo = z.infer<typeof assetInfoSchema>;
