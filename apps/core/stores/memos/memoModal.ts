import {
  AllPortfolioDetail,
  MemoForm,
} from '@core/schemas/features/memos/memos.schema';
// import { PortfolioReferenceData } from '@core/types/memos/referenceData';
import { atom } from 'jotai';

export const linkedPortfolioInfoAtom = atom<AllPortfolioDetail | undefined>(
  undefined
);
export const copiedMemoFormDataAtom = atom<
  // currency 는 동일 자산간 같으므로.
  MemoForm | undefined
>(undefined);
