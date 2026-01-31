import z from 'zod';

/** 임시 target Origin schema */
export const targetPortfolioOriginSchema = z.object({
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
