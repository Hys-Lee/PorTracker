import {
  CURRENCY_VALUES,
  MEMO_EVALUATION_VALUES,
  MEMO_IMPORTANCE_VALUES,
  TRANSACTION_MAP,
  TRANSACTION_VALUES,
} from '../constants';
import { z } from 'zod';

/** 나중에 백엔드 기준 schema를 참조하도록 변경해야 함. 이 안에서 참조하는게 아니라. */

/** RES */

export const transactionTypesSchema = z.object({
  value: z.enum(TRANSACTION_VALUES),
  text: z.string().min(1, '유요한 값이어야 합니다'),
});
export const transactionTypesListSchema = z.array(transactionTypesSchema);

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

export const assetInfoListSchema = z.array(assetInfoSchema);

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
  transactionType: z.enum([...TRANSACTION_VALUES]),
  changesRatio: z.number(),
  accumulatedRatio: z.number(),
  value: z.number(),
  currency: z.enum([...CURRENCY_VALUES]),
});

export const actualPortfolioListSchema = z.array(actualPortfolioSchema);

export const relatedActualAssetSchema = z.object({
  id: actualPortfolioSchema.shape.id,
  transactionType: z.enum([...TRANSACTION_VALUES]),
  price: z.number(),
  amount: z.number(),
  exchangeRate: z.number(),
  date: actualPortfolioSchema.shape.date,
  value: actualPortfolioSchema.shape.value,
});

export const relatedActualAssetsListSchema = z.array(relatedActualAssetSchema);

export const relatedMemoSchema = z.object({
  id: z.string().uuid('유효한 uuid가 아닙니다'),
  importance: z.enum([...MEMO_IMPORTANCE_VALUES]),
  title: z.string().min(1, '제목은 필수입니다'),
  content: z.string(),
  tags: z.array(z.string().min(1, '태그 명을 작성하세요')),
  evaluation: z.enum([...MEMO_EVALUATION_VALUES]),
});

export const actualRecentSchema = z.object({
  amount: z.number(),
  date: actualPortfolioSchema.shape.date,
  currency: z.enum([...CURRENCY_VALUES]),
  exchangeRate: z.number(),
  id: actualPortfolioSchema.shape.id,
  price: z.number(),
  transactionType: z.enum([...TRANSACTION_VALUES]),
});

export const actualRecentListSchema = z.array(actualRecentSchema);

export const actualFormSchema = z.object({
  id: actualPortfolioSchema.shape.id,
  assetInfo: assetInfoSchema,
  date: actualPortfolioSchema.shape.date,
  transactionType: z.enum([...TRANSACTION_VALUES]),
  price: z.number(),
  amount: z.number(),
  currency: z.enum([...CURRENCY_VALUES]),
  exchangeRate: z.number(),
  relatedActuals: relatedActualAssetsListSchema,
  relatedMemoId: relatedMemoSchema.shape.id.optional(),
  recents: actualRecentListSchema,
});

export type AssetInfo = z.infer<typeof assetInfoSchema>;
export type ActualPortfolio = z.infer<typeof actualPortfolioSchema>;
export type ActualForm = z.infer<typeof actualFormSchema>;
export type RelatedActualAsset = z.infer<typeof relatedActualAssetSchema>;
export type RelatedMemo = z.infer<typeof relatedMemoSchema>;

// 데이터 스키마를 정하고 바로 타입으로도 만든다.
// ㄴ> 한 곳에서 깔끔하게 관리되고 좋네.

/** PARAMS */
export const getActualPorfolioParamsSchema = z.object({
  actualId: z.string().uuid('유효한 uuid가 아닙니다'),
});

export const getRelatedMemoParamsSchema = z.object({
  memoId: z.string().uuid('유효한 uuid가 아닙니다'),
});

/** REQ */
