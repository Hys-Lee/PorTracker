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
  linkedPortfolioInfo: actualPortfolioDetailedSchema.optional(),
});
export const memoFormListSchema = z.array(memoFormSchema);

export const memoRecentSchema = memoFormSchema.omit({
  linkedPortfolioInfo: true,
});
export const memoRecentListSchema = z.array(memoRecentSchema);

export type ActualPortfolioDetail = z.infer<
  typeof actualPortfolioDetailedSchema
>;
export type TargetPortfolioDetail = z.infer<
  typeof targetPortfolioDetailedSchema
>;
export type AllPortfolioDetail = z.infer<typeof allPortfolioDetailedSchema>;

export type MemoForm = z.infer<typeof memoFormSchema>;

export type MemoRecent = z.infer<typeof memoRecentSchema>;

/** PARAMS */
export const getMemoFormParamsSchema = z.object({
  memoId: z.string().uuid('유효한 uuid가 아닙니다'),
});

/** RES for REQ */

export const memoCreateResponseSchema = memoFormSchema.omit({
  id: true,
  linkedPortfolioInfo: true,
});

export const memoUpdateResponseSchema = memoFormSchema.omit({
  linkedPortfolioInfo: true,
});

export const memoDeleteResponseSchema = memoFormSchema.pick({ id: true });

export type MemoFormCreateResponse = z.infer<typeof memoCreateResponseSchema>;
export type MemoFormUpdateResponse = z.infer<typeof memoUpdateResponseSchema>;
export type MemoFormDeleteResponse = z.infer<typeof memoDeleteResponseSchema>;

/** REQ */

export const memoFormRequestSchema = z.discriminatedUnion('submitMode', [
  z.object({
    submitMode: z.literal('add'),
    ...memoCreateResponseSchema.omit({}).shape,
    linkedPortfolioId: actualPortfolioDetailedSchema.shape.id,
  }),
  z.object({
    submitMode: z.literal('modify'),
    ...memoUpdateResponseSchema.omit({}).shape,
    linkedPortfolioId: actualPortfolioDetailedSchema.shape.id,
  }),
  z.object({
    submitMode: z.literal('delete'),
    ...memoDeleteResponseSchema.shape,
  }),
]);

export type MemoFormRequest = z.infer<typeof memoFormRequestSchema>;

export type MemoFormCreateRequest = Omit<
  Extract<MemoFormRequest, { submitMode: 'add' }>,
  'submitMode'
>;
export type MemoFormUpdateRequest = Omit<
  Extract<MemoFormRequest, { submitMode: 'modify' }>,
  'submitMode'
>;
export type MemoFormDeleteRequest = Omit<
  Extract<MemoFormRequest, { submitMode: 'delete' }>,
  'submitMode'
>;
