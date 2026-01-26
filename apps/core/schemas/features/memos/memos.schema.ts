import z from 'zod';
import { actualPortfolioOriginSchema } from '../../domains/actualPortfolio.schema';
import { memoOriginSchema } from '@core/schemas/domains/memo.schema';

export const actualPortfolioDetailedSchema = actualPortfolioOriginSchema.extend(
  {
    value: z.number(),
    accumulatedValue: z.number(),
  }
);
export const actualPortfolioDetailedListSchema = z.array(
  actualPortfolioDetailedSchema
);

/** 임시 target detail schema */
export const targetPortfolioDetailedSchema = z.object({
  id: z.string(),
  name: z.string(),
  assetsList: z.array(
    z.object({
      assetName: z.string(),
      assetType: z.string(),
      currentRatioBps: z.number(),
      ratioDeltaBps: z.number(),
    })
  ),
});

export const allPortfolioDetailedSchema = z.discriminatedUnion(
  'portfolioType',
  [
    z.object({
      portfolioType: z.literal('actual'),
      ...actualPortfolioDetailedSchema.shape,
    }),
    z.object({
      portfolioType: z.literal('target'),
      ...targetPortfolioDetailedSchema.shape,
    }),
  ]
);
export const allPortfolioDetailedListSchema = z.array(
  allPortfolioDetailedSchema
);

export const memoFormSchema = z.object({
  ...memoOriginSchema.shape,
});
export const memoFormListSchema = z.array(memoFormSchema);

export type ActualPortfolioDetail = z.infer<
  typeof actualPortfolioDetailedSchema
>;
export type TargetPortfolioDetail = z.infer<
  typeof targetPortfolioDetailedSchema
>;
export type AllPortfolioDetail = z.infer<typeof allPortfolioDetailedSchema>;

export type MemoForm = z.infer<typeof memoFormSchema>;
