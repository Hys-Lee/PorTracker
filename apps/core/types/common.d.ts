import {
  CURRENCY_VALUES,
  MEMO_EVALUATION_VALUES,
  MEMO_IMPORTANCE_VALUES,
  PORTFOLIO_TYPE_VALUES,
  TRANSACTION_VALUES,
  MEMO_TYPE_VALUES,
} from '@core/constants';
export type CurrencyValue = (typeof CURRENCY_VALUES)[number];
export type TransactionValue = (typeof TRANSACTION_VALUES)[number]; //'allocation' | 'withdrawal' | 'dividend' | 'fee';
export type MemoImportanceValue = (typeof MEMO_IMPORTANCE_VALUES)[number]; //'critical' | 'useful' | 'normal';
export type MemoEvaluationValue = (typeof MEMO_EVALUATION_VALUES)[number]; // 'better' | 'good' | 'soso' | 'bad' | 'worse';
export type MemoTypeValue = (typeof MEMO_TYPE_VALUES)[number];
export type PortfolioTypeValue = (typeof PORTFOLIO_TYPE_VALUES)[number];
