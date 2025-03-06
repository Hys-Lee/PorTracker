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

const CompoundFormDateStyle = css({
  //   background: 'black',
  flexGrow: '1',
  padding: '2px',
  paddingLeft: '8px',
  paddingRight: '8px',
  border: 'none',
  outline: '2px solid rgb(230,230,230)',
  '&:hover': {
    '&:not(:focus)': {
      outline: '2px solid #ceeee5',
    },
  },
  '&:focus': {
    outline: '2px solid #8cdec5',
  },
  borderRadius: 'md',
});
