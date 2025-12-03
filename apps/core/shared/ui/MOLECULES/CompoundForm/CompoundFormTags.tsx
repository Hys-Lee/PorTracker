import { css } from '@styled-system/css';
import { GroupBase, Options } from 'react-select';
import AsyncCreatableSelect, {
  AsyncCreatableProps,
} from 'react-select/async-creatable';

// type ReactSelectOptions = Options<string>;
type ReactSelectOptions = Options<{ value: string; label: string }>;
type CompoundFormTagsProps = AsyncCreatableProps<
  ReactSelectOptions,
  true,
  GroupBase<ReactSelectOptions>
>;

const CompoundFormTags = ({
  defaultOptions,
  isLoading,
  ...props
}: CompoundFormTagsProps) => {
  return (
    <div>
      <AsyncCreatableSelect
        isMulti
        isClearable
        defaultOptions={defaultOptions}
        isLoading={isLoading}
        // options={options}
        // loadOptions={loadOptions}
        placeholder="태그를 선택 혹은 입력해주세요"
        noOptionsMessage={() => '새 태그를 입력해보세요'}
        formatCreateLabel={(inputValue) => {
          return (
            <p style={{ color: 'gray' }}>
              <span style={{ fontWeight: 'bold' }}>{'#'}</span> {inputValue}
            </p>
          );
        }}
        classNames={{
          noOptionsMessage: () =>
            css({
              fontWeight: 'medium',
            }),
          multiValue: (props) =>
            css({
              padding: '0 4px !important',
              display: 'flex',
              alignItems: 'center',
              background: '#e4fbf2 !important',
              rounded: 'lg !important',
            }),
          multiValueLabel: () =>
            css({
              color: '#2d64dc !important',
              '&::before': {
                content: '"# "',
              },
              paddingLeft: 'inherit  !important',
            }),
          multiValueRemove: (props) =>
            css({
              padding: '2px !important',
              rounded: 'full !important',
              '&:hover': {
                bg: 'none !important',
                // color: 'inherit !important',
              },
              // bg: props.isFocused ? 'gray.100 !important' : 'none !important',
            }),
          indicatorSeparator: (props) => css({ width: '0px !important' }),
          control: (props) =>
            css({
              borderTop: 'none !important',
              borderLeft: 'none !important',
              borderRight: 'none !important',
              borderBottom: props.isFocused
                ? '2px solid #77efcd !important'
                : '2px solid rgb(230,230,230) !important',
              rounded: '0 !important',
              boxShadow: props.isFocused
                ? '0 0.1px 0.5px #b2eada !important'
                : 'none',
            }),
          menu: (props) =>
            css({
              boxShadow: '0 4px 11px hsla(0, 0%, 0%, 0.1) !important',
              padding: '8px',
              background: 'white !important',
              gap: '8px',
              rounded: 'xl !important',
            }),
          menuList: (props) =>
            css({
              display: 'flex !important',
              flexDirection: 'column !important',
              gap: '8px !important',
            }),
          option: (props) =>
            css({
              rounded: 'lg',
              color: 'black !important',
              background: 'white !important',
              '&:hover': {
                backgroundColor: 'gray.200 !important',
              },
            }),
        }}
        {...props}
      />
    </div>
  );
};

export default CompoundFormTags;
