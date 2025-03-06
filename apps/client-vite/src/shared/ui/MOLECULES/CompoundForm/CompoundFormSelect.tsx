import { Options, SingleValue } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { forwardRef } from 'react';
import { css } from '@styled-system/css';

type ReactSelectOptions = Options<{ value: string; label: string }>;
interface CompoundFormSelectProps {
  defaultOptions?: ReactSelectOptions;
  isLoading: boolean;
  onChange: (newValue: string) => void;
  defaultValue?: ReactSelectOptions;
}

const CompoundFormSelect = forwardRef(
  (
    {
      defaultOptions,
      isLoading,
      onChange,
      defaultValue,
    }: CompoundFormSelectProps,
    ref: React.ForwardedRef<null>
  ) => {
    return (
      <div className={SelectContainerDefaultStyle}>
        <AsyncCreatableSelect
          // menuIsOpen
          ref={ref}
          isClearable
          defaultOptions={defaultOptions}
          onChange={(newValue) => {
            if (newValue) {
              onChange(newValue.value);
            }
          }}
          defaultValue={defaultValue}
          // options={options}
          // loadOptions={loadOptions}
          noOptionsMessage={() => '현재 값입니다'}
          formatCreateLabel={(inputValue) => (
            <p style={{ color: 'gray' }}>
              {inputValue}{' '}
              <span style={{ fontWeight: 'bold' }}>{'생성하기'}</span>{' '}
            </p>
          )}
          isLoading={isLoading}
          classNames={{
            indicatorSeparator: (props) =>
              css({ width: '0px !important', height: '0px !important' }),
            control: (props) =>
              css({
                border: props.isFocused
                  ? '2px solid #77efcd !important'
                  : '2px solid rgb(230,230,230) !important',
                rounded: 'xl',
                boxShadow: props.isFocused
                  ? '0 0 0 0.5px #b2eada !important'
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
        />
      </div>
    );
  }
);

export default CompoundFormSelect;

const SelectContainerDefaultStyle = css({
  flexGrow: '1',
});
