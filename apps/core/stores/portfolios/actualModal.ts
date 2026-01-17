import FormArea from '@core/components/portfolios/ORGANISMS/ActualFormModalView/_ingredients/ActualFormArea/ActualFormArea';
import { DropdownItem } from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import { atom } from 'jotai';
import { ComponentProps } from 'react';

export const selectedAssetAtom = atom<DropdownItem<string> | undefined>(
  undefined
);

export const copiedFormDataAtom = atom<
  | Omit<NonNullable<ComponentProps<typeof FormArea>['initData']>, 'currency'>
  | undefined
>(undefined);
