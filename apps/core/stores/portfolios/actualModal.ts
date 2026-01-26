import FormArea from '@core/components/portfolios/ORGANISMS/ActualFormModalView/_ingredients/ActualFormArea/ActualFormArea';
import { DropdownItem } from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
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
