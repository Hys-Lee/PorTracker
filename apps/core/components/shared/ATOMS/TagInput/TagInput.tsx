'use client';

import { Select, SelectProps, ConfigProvider } from 'antd';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import tagInputCss from './TagInput.module.css';
import { useStateReducer } from '@core/utils/hooks/useStateReducer.ts/useStateReducer';

interface TagInputProps
  extends Omit<SelectProps, 'tokenSeparators' | 'mode' | 'className'> {
  externalStylex?: stylex.StyleXStyles;
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;

  // 비제어처리
  name?: string;
  form?: string;
  required?: boolean;
  disabled?: boolean;
}

const TagInput = ({
  externalStylex,
  defaultValue = [],
  value,
  onChange,
  // 아래는 비제어
  name,
  form,
  required,
  disabled,
  // 아래는 나머지
  ...props
}: TagInputProps) => {
  const [state, setState] = useStateReducer(defaultValue, (_, nextState) => {
    return nextState;
  });

  const handleChange = (tags: string[]) => {
    setState(tags);
    onChange && onChange(tags);
  };
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorBgContainer: colors.bgNormal,
              colorBorder: colors.bgNormal,
              activeBorderColor: colors.primary,
              hoverBorderColor: colors.primary,
              activeOutlineColor: `rgb(from ${colors.primary} r g b / 0.1)`,
              optionSelectedBg: `rgb(from ${colors.primary} r g b / 0.2)`,
              multipleItemBg: `rgb(from ${colors.primary} r g b / 0.3)`,
              colorPrimary: colors.textPrimary,
              //   fontSize: 16,
              fontWeightStrong: 500,
              fontFamily: 'inherit',
              colorText: colors.textNormal,
            },
          },
        }}
      >
        <Select
          tokenSeparators={[' ']}
          mode="tags"
          maxTagCount={'responsive'}
          {...props}
          className={`${
            stylex.props(tagInputStyles.base, externalStylex).className
          } ${tagInputCss.base}`}
          defaultValue={defaultValue}
          value={value ?? state}
          onChange={(tags) => {
            handleChange(tags);
          }}
        />
        {value ? undefined : (
          <input
            type="hidden"
            value={state}
            name={name}
            form={form}
            required={required}
            disabled={disabled}
          />
        )}
      </ConfigProvider>
    </>
  );
};
export default TagInput;

const tagInputStyles = stylex.create({
  base: {
    width: '200px',
  },
});
