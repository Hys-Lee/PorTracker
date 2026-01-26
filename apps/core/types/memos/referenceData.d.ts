import { MemoTypeValue, TransactionValue, CurrencyValue } from '../common';
import {
  ActualPortfolio,
  ActualPortfolioDetail,
  AllPortfolioDetail,
  TargetPortfolioDetail,
} from '@core/schemas/features/portfolios/portfolios.schema';

export type PortfolioReferenceData =
  //   | ActualPortfolioDetail
  //   | TargetPortfolioDetail
  AllPortfolioDetail | NonePortfolio;

export interface NonePortfolio
  extends Record<keyof Pick<AllPortfolioDetail, 'portfolioType'>, string> {
  portfolioType: 'none';
}

/** Target Reference 관련 임시 (schema 나오기 전)*/

// export type TargetPortfolio = TargetReferenceProps['targetsInfo'][number] & {
//   id: string;
// };

// export interface TargetReferenceProps {
//   targetsInfo: {
//     assetName: string;
//     assetType: string;
//     currentRatioBps: number;
//     ratioDeltaBps: number;
//   }[];
// }
