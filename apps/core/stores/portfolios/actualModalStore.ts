import FormArea from '@core/components/portfolios/ORGANISMS/ActualFormModalView/_ingredients/ActualFormArea/ActualFormArea';
import { DropdownItem } from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import { RelatedMemo } from '@core/schemas/features/portfolios/portfolios.schema';
import { atom } from 'jotai';
import { ComponentProps } from 'react';

export const selectedAssetAtom = atom<DropdownItem<string> | undefined>(
  undefined
);

export const copiedActualPortfolioFormDataAtom = atom<
  // currency 는 동일 자산간 같으므로.
  | Omit<NonNullable<ComponentProps<typeof FormArea>['initData']>, 'currency'>
  | undefined
>(undefined);

export const linkedMemoInfoAtom = atom<RelatedMemo | null | undefined>( // 미선택 의도 있으면 null,초기 값이면 undefiend
  undefined
);
