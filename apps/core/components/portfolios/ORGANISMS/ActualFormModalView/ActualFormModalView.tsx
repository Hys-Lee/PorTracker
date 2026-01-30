'use client';

import FormModalFrame from '@core/components/shared/ATOMS/FormModalFrame/FormModalFrame';
import Tips from '@core/components/shared/ATOMS/Tips/Tips';
import DatePicker from '@core/components/shared/MOLECULES/DatePicker/DatePicker';
import Dropdown from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import IconSelect from '@core/components/shared/MOLECULES/IconSelect/IconSelect';
import Switch from '@core/components/shared/MOLECULES/Switch/Switch';
import {
  cloneElement,
  ComponentProps,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react';
import * as stylex from '@stylexjs/stylex';
import { inputBase } from '@core/styles/input.stylex';
import { colors } from '../../../../tokens/colors.stylex';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import NumericInput from '@core/components/shared/_prototypes/NumericInput/NumericInput';
import { CurrencyValue, TransactionValue } from '@core/types';
import SegmentControl from '@core/components/shared/MOLECULES/SegmentControl/SegmentControl';
import FormArea from './_ingredients/ActualFormArea/ActualFormArea';
import { useAtom } from 'jotai';
import { copiedActualPortfolioFormDataAtom } from '@core/stores/portfolios/actualModalStore';

interface ActualFormModalViewProps {
  asClose?: ComponentProps<typeof FormModalFrame>['asClose'];
  actionButton?: ReactNode;
  formArea: ReactNode;
  portfolioReference: ReactNode;
  memoReference: ReactNode;
}
const ActualFormModalView = ({
  asClose,
  actionButton,
  formArea,
  memoReference,
  portfolioReference,
}: ActualFormModalViewProps) => {
  const [referMode, setReferMode] = useState<
    'portfolioReference' | 'memoReference'
  >('portfolioReference');
  const [copiedFormData] = useAtom(copiedActualPortfolioFormDataAtom);
  return (
    <FormModalFrame
      open={true}
      asClose={asClose}
      frameStylex={modalStyles.base}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          // justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 style={{ margin: '10px' }}>Actual Portfolio</h2>
        </div>
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '44px',
            height: '440px',
          }}
        >
          {/* <FormArea /> */}
          <div style={{ width: '100%' }}>
            {
              // formArea
              cloneElement(formArea as ReactElement, {
                key: copiedFormData?.assetInfo.value,
              })
            }
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '8px',
              flexDirection: 'column',
              justifyContent: 'start',
            }}
          >
            <SegmentControl
              items={referModes}
              defaultSelected={referModes[0]}
              onChange={(selected) => {
                setReferMode(selected.value as typeof referMode);
              }}
              selected={referModes.find(({ value }) => value === referMode)}
            />
            {referMode === 'portfolioReference'
              ? portfolioReference
              : memoReference}
          </div>
        </section>
        {/* <div style={{ width: '100%', display: 'flex', gap: '8px' }}>
          <button style={{ flexGrow: 1 }}>대충 이런 느낌이려나?</button>
          <button style={{ flexGrow: 1 }}>대충 이런 느낌이려나?</button>
        </div> */}
        {actionButton}
      </div>
    </FormModalFrame>
  );
};

export default ActualFormModalView;

const referModes = [
  { value: 'portfolioReference', text: 'Asset Histories' },
  { value: 'memoReference', text: 'Linked Memo' },
];

const modalStyles = stylex.create({
  base: {
    backgroundColor: 'white',
    // height: 'auto',
    height: '600px',
  },
});
const ReferenceArea = () => {
  return <div></div>;
};

const AssetHistories = () => {
  return <div></div>;
};

const LinkedMemo = () => {
  return <div></div>;
};

export const tmp = () => {
  console.log('tmp');
};
