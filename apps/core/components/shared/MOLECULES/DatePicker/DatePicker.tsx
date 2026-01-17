import { DatePicker as AntdDatePicker, ConfigProvider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import { ReactNode } from 'react';

/** Antd 내부 위한 타입 */
type AntdDate = Dayjs | null | undefined;
type AntdRangeDate = [AntdDate, AntdDate] | null | undefined;

/** 외부 위한 타입 */

type CommonType = {
  name?: string;
  form?: string;
  disabled?: boolean;
  required?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  // YYYY.MM.DD 나, MM.DD.YY 등등.
  format?: string;
  // !important를 잘 붙이기
  rootStyleX?: stylex.StyleXStyles;
};

type CustomDatePickerProps = CommonType & {
  range: false;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null, dateString: string) => void;
  placeholder?: string;
};
type CustomRangeDatePickerProps = CommonType & {
  range: true;
  value?: [Date, Date] | null;
  defaultValue?: [Date, Date] | null;
  onChange?: (
    date: [Date | null, Date | null] | null, /////////////// 1개일 수도 있나
    dateString: [string, string]
  ) => void;
  placeholder?: [string, string];
};
type DatePickerProps = CustomDatePickerProps | CustomRangeDatePickerProps;

const DatePicker = ({
  range,
  value,
  onChange,
  defaultValue,
  placeholder,
  rootStyleX,
  ...props
}: DatePickerProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            colorPrimary: colors.primary,
            colorPrimaryHover: colors.primary,
            colorPrimaryActive: colors.primary,
            colorText: colors.textNormal,
            colorLink: `rgb(from ${colors.textPrimary} r g b / 0.7)`,
            colorLinkActive: colors.textPrimary,
            colorLinkHover: colors.textPrimary,
            cellActiveWithRangeBg: `rgb(from ${colors.primary} r g b / 0.3)`,
          },
        },
      }}
    >
      {range ? (
        <AntdDatePicker.RangePicker
          {...props}
          classNames={{
            root: `${stylex.props(rootStyles.base, rootStyleX).className}`,

            input: stylex.props(inputStyles.base).className,
          }}
          format={props.format || 'YYYY.MM.DD'}
          suffixIcon={props.suffix}
          placeholder={placeholder}
          defaultValue={
            // 수정해야 한ㄴ뎅
            Array.isArray(defaultValue) && !(defaultValue instanceof Date)
              ? (defaultValue.map((val) =>
                  dayjs(val)
                ) as NonNullable<AntdRangeDate>)
              : undefined
          }
          value={
            Array.isArray(value) && !(value instanceof Date)
              ? (value.map((val) => dayjs(val)) as AntdRangeDate)
              : (value as null | undefined)
          }
          onChange={(value, valueString) => {
            onChange &&
              onChange(
                !value || value.length !== 2
                  ? null
                  : (value.map((val) => val && val.toDate()) as [
                      Date | null,
                      Date | null
                    ]),
                valueString
              );
          }}
        />
      ) : (
        <AntdDatePicker
          {...props}
          classNames={{
            root: rootStyleX
              ? stylex.props(rootStyles.base, rootStyleX).className
              : undefined,
          }}
          format={props.format || 'YYYY.MM.DD'}
          suffixIcon={props.suffix}
          placeholder={placeholder}
          defaultValue={
            !Array.isArray(defaultValue) && defaultValue
              ? dayjs(defaultValue)
              : (defaultValue as null | undefined)
          }
          value={
            !Array.isArray(value) && value
              ? dayjs(value)
              : (value as null | undefined)
          }
          onChange={(value, valueString) => {
            onChange &&
              onChange(value ? value.toDate() : null, valueString || '');
          }}
        />
      )}
    </ConfigProvider>
  );
};
export default DatePicker;

// borderRadius: '12px',
const rootStyles = stylex.create({
  base: {
    borderRadius: '12px !important',
    borderWidth: '0px !important',
    // backgroundColor: `${colors.bgNormal} !important`,
    height: '48px',

    //
    boxShadow: {
      default: 'none',
      ':focus-visible': `inset 0 0 0 1px ${colors.primaryVariant900} !important`,
    },
    backgroundColor: {
      default: `${colors.bgNormal} !important`,
      ':hover': `${colors.bgStrong} !important`,
    },
  },
});
const inputStyles = stylex.create({
  base: {
    textAlign: 'center',
  },
});
