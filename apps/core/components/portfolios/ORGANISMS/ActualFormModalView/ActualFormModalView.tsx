import FormModalFrame from '@core/components/shared/ATOMS/FormModalFrame/FormModalFrame';
import Tips from '@core/components/shared/ATOMS/Tips/Tips';
import DatePicker from '@core/components/shared/MOLECULES/DatePicker/DatePicker';
import Dropdown from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import IconSelect from '@core/components/shared/MOLECULES/IconSelect/IconSelect';
import Switch from '@core/components/shared/MOLECULES/Switch/Switch';
import { ComponentProps, ReactNode, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { inputBase } from '@core/styles/input.stylex';
import { colors } from '../../../../tokens/colors.stylex';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import NumericInput from '@core/components/shared/_prototypes/NumericInput/NumericInput';
import { CurrencyValue, TransactionValue } from '@core/types';
import SegmentControl from '@core/components/shared/MOLECULES/SegmentControl/SegmentControl';

interface ActualFormModalViewProps {
  onClose: ComponentProps<typeof FormModalFrame>['onClose'];
  onSuccess?: () => void;
  formArea: ReactNode;
  portfolioReference: ReactNode;
  memoReference: ReactNode;
}
const ActualFormModalView = ({
  onClose,
  onSuccess,
  formArea,
  memoReference,
  portfolioReference,
}: ActualFormModalViewProps) => {
  const [referMode, setReferMode] = useState<
    'portfolioReference' | 'memoReference'
  >('portfolioReference');
  return (
    <FormModalFrame onClose={onClose} frameStylex={modalStyles.base}>
      <div>
        <div>
          <h2>Actual Portfolio</h2>
        </div>
        <section style={{ display: 'flex' }}>
          {/* <FormArea /> */}
          {formArea}
          <div style={{ width: '50%' }}>
            <SegmentControl
              items={referModes}
              defaultSelected={referModes[0]}
              onChange={(selected) => {
                setReferMode(selected.value as typeof referMode);
              }}
              selected={referModes.find(({ value }) => value === referMode)}
            />
          </div>
          {referMode === 'portfolioReference'
            ? portfolioReference
            : memoReference}
        </section>
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
