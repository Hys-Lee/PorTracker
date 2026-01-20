import {
  TransactionValue,
  CurrencyValue,
  MemoImportanceValue,
  PortfolioTypeValue,
  MemoTypeValue,
} from '@core/types';

/** Value Constants */
export const TRANSACTION_VALUES = [
  'allocation',
  'withdrawal',
  'dividend',
  'fee',
] as const;

export const CURRENCY_VALUES = ['usd', 'krw'] as const;

export const PORTFOLIO_TYPE_VALUES = ['actual', 'target'] as const;

export const MEMO_TYPE_VALUES = [...PORTFOLIO_TYPE_VALUES, 'event'] as const;

export const MEMO_IMPORTANCE_VALUES = ['critical', 'normal', 'useful'] as const;

export const MEMO_EVALUATION_VALUES = [
  'better',
  'good',
  'soso',
  'bad',
  'worse',
] as const;

/** Maps */

export const TRANSACTION_MAP: Record<TransactionValue, string> = {
  allocation: '투자',
  withdrawal: '회수',
  dividend: '배당',
  fee: '비용',
} as const;

export const CURRENCY_MAP: Record<CurrencyValue, string> = {
  krw: '원',
  usd: '달러',
} as const;

export const MEMO_IMPORTANCE_MAP: Record<MemoImportanceValue, string> = {
  critical: 'Critical',
  normal: 'Normal',
  useful: 'Useful',
} as const;

export const PORTFOLIO_TYPE_MAP: Record<PortfolioTypeValue, string> = {
  actual: 'Actual',
  target: 'Target',
} as const;

export const MEMO_TYPE_MAP: Record<MemoTypeValue, string> = {
  actual: 'Actual',
  target: 'Target',
  event: 'Event',
};
