import { TransactionValue, CurrencyValue } from '@core/types';

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
