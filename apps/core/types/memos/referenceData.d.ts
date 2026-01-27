import { MemoTypeValue, TransactionValue, CurrencyValue } from '../common';
import type { AllPortfolioDetail } from '@core/schemas/features/memos/memos.schema';
export type PortfolioReferenceData = AllPortfolioDetail | NonePortfolio;

export interface NonePortfolio
  extends Record<keyof Pick<AllPortfolioDetail, 'portfolioType'>, string> {
  portfolioType: 'none';
}
