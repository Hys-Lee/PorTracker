import { DatePicker as AntdDatePicker, ConfigProvider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';

/** Antd 내부 위한 타입 */
type AntdDate = Dayjs | null | undefined;
type AntdRangeDate = [AntdDate, AntdDate] | null | undefined;

/** 외부 위한 타입 */

type CommonUncontrolledType = {
  name?: string;
  form?: string;
  disabled?: boolean;
  required?: boolean;
};

type CustomDatePickerProps = CommonUncontrolledType & {
  range: false;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange: (date: Date | null, dateString: string) => void;
  placeholder?: string;
};
type CustomRangeDatePickerProps = CommonUncontrolledType & {
  range: true;
  value?: [Date, Date] | null;
  defaultValue?: [Date, Date] | null;
  onChange: (
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
          defaultValue={
            Array.isArray(value) && !(value instanceof Date)
              ? (value.map((val) => dayjs(val)) as NonNullable<AntdRangeDate>)
              : undefined
          }
          value={
            Array.isArray(value) && !(value instanceof Date)
              ? (value.map((val) => dayjs(val)) as AntdRangeDate)
              : (value as null | undefined)
          }
          onChange={(value, valueString) => {
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
          defaultValue={
            !Array.isArray(value) && value
              ? dayjs(value)
              : (value as null | undefined)
          }
          value={
            !Array.isArray(value) && value
              ? dayjs(value)
              : (value as null | undefined)
          }
          onChange={(value, valueString) => {
            onChange(value ? value.toDate() : null, valueString || '');
          }}
        />
      )}
    </ConfigProvider>
  );
};
export default DatePicker;
