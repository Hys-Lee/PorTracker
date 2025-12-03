import { atom } from 'jotai';

export interface relatedAtomField {
  date: Date;
  exchangeRate: number;
  price: number;
  shares: number;
  transactionType: string;
}

export type relatedActualAtomKeys = keyof relatedAtomField;

export const relatedActualAtom = atom({
  date: new Date(Date.now()),
  exchangeRate: 0,
  price: 0,
  shares: 0,
  transactionType: 'allocation' as 'allocation' | 'withdrawal',
});
