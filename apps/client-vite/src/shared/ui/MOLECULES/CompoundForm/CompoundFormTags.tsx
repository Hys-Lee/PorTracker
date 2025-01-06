import { Options } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';

type ReactSelectOptions = Options<{ value: string; label: string }>;
interface CompoundFormTagsProps {
  defaultOptions?: ReactSelectOptions;
  isLoading: boolean;
}

const CompoundFormTags = ({
  defaultOptions,
  isLoading,
}: CompoundFormTagsProps) => {
  return (
    <div>
      <AsyncCreatableSelect
        isMulti
        isClearable
        defaultOptions={defaultOptions}
        // options={options}
        // loadOptions={loadOptions}

        isLoading={isLoading}
      />
    </div>
  );
};

export default CompoundFormTags;
