import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { css } from '@styled-system/css';

type DatePickerProps = React.ComponentProps<typeof DatePicker>;

const CompoundFormDate = ({ ...props }: DatePickerProps) => {
  return (
    <>
      <DatePicker className={CompoundFormDateStyle} {...props} />
    </>
  );
};
export default CompoundFormDate;

const CompoundFormDateStyle = css({});
