import { Options } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { forwardRef } from 'react';

type ReactSelectOptions = Options<{ value: string; label: string }>;
interface CompoundFormSelectProps {
  defaultOptions?: ReactSelectOptions;
  isLoading: boolean;
}

const CompoundFormSelect = forwardRef(
  (
    { defaultOptions, isLoading }: CompoundFormSelectProps,
    ref: React.ForwardedRef<null>
  ) => {
    return (
      <div>
        <AsyncCreatableSelect
          ref={ref}
          isClearable
          defaultOptions={defaultOptions}
          // options={options}
          // loadOptions={loadOptions}
          isLoading={isLoading}
        />
      </div>
    );
  }
);

export default CompoundFormSelect;
