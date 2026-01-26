import z from 'zod';
import { assetInfoSchema } from './asset.schema';
import { CURRENCY_VALUES, TRANSACTION_VALUES } from '@core/constants';

export const actualPortfolioOriginSchema = z.object({
  id: z.string().uuid('유효한 uuid가 아닙니다'),
  assetName: assetInfoSchema.shape.name,
  assetDescription: assetInfoSchema.shape.description,
  assetType: assetInfoSchema.shape.type,
  date: z
    .string()
    .datetime({ message: '유효한 날짜가 아닙니다' })
    .transform((str) => new Date(str)),
  createdAt: z
    .string()
    .datetime({ message: '유효한 날짜가 아닙니다' })
    .transform((str) => new Date(str)),
  transactionType: z.enum([...TRANSACTION_VALUES]),
  changesRatio: z.number(),
  accumulatedRatio: z.number(),
  currency: z.enum([...CURRENCY_VALUES]),
  price: z.coerce.number({ message: '유효한 가격이 아닙니다' }),
  amount: z.coerce.number({ message: '유효한 수량이 아닙니다' }),
  exchangeRate: z.coerce.number({ message: '유효한 환율이 아닙니다' }),
});
