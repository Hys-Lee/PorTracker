import { Options } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';

type ReactSelectOptions = Options<{ value: string; label: string }>;
interface CompoundFormSelectProps {
  defaultOptions?: ReactSelectOptions;
  isLoading: boolean;
}

const CompoundFormSelect = ({
  defaultOptions,
  isLoading,
}: CompoundFormSelectProps) => {
  return (
    <div>
      <AsyncCreatableSelect
        isClearable
        defaultOptions={defaultOptions}
        // options={options}
        // loadOptions={loadOptions}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CompoundFormSelect;
