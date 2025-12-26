import { z } from 'zod';

/** 나중에 백엔드 기준 schema를 참조하도록 변경해야 함. 이 안에서 참조하는게 아니라. */

export const assetInfoSchema = z.object({
  id: z.string().uuid('유효한 uuid가 아닙니다'),
  name: z.string().min(1, '이름은 필수입니다'),
  type: z.string().min(1, '유효한 타입이어야 합니다.'),
  description: z.string().optional(),
  createdAt: z
    .string()
    .datetime()
    .transform((str) => new Date(str)),
});

export const actualPortfolioSchema = z.object({
  id: z.string().uuid('유효한 uuid가 아닙니다'),
  assetName: assetInfoSchema.shape.name,
  assetDescription: assetInfoSchema.shape.description,
  assetType: assetInfoSchema.shape.type,
  date: z
    .string()
    .datetime()
    .transform((str) => new Date(str)),
  createdAt: z
    .string()
    .datetime()
    .transform((str) => new Date(str)),
  transactionType: z.string(),
  changesRatio: z.number(),
  AccumulatedRatio: z.number(),
  value: z.number(),
  currency: z.string().min(1, '이름은 필수입니다'),
});

export const actualFormSchema = z.object({
  id: actualPortfolioSchema.shape.id,
  assetInfo: assetInfoSchema,
  date: actualPortfolioSchema.shape.date,
  transactionType: actualPortfolioSchema.shape.transactionType,
  price: z.number(),
  amount: z.number(),
  exchangeRate: z.number(),
});

export const relatedAssetSchema = z.object({
  id: actualPortfolioSchema.shape.id,
  transactionType: actualPortfolioSchema.shape.transactionType,
  price: actualFormSchema.shape.price,
  amount: actualFormSchema.shape.amount,
  exchangeRate: actualFormSchema.shape.exchangeRate,
  date: actualPortfolioSchema.shape.date,
  value: actualPortfolioSchema.shape.value,
});

export const relatedMemoSchema = z.object({
  importance: z.string(),
  title: z.string().min(1, '제목은 필수입니다'),
  content: z.string(),
  tags: z.array(z.string().min(1, '태그 명을 작성하세요')),
  evaluation: z.string(),
});
