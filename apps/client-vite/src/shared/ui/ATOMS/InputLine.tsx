import { css } from '@styled-system/css';
import { forwardRef, InputHTMLAttributes } from 'react';

type InputLineProps = InputHTMLAttributes<HTMLInputElement>;

const InputLine = forwardRef(
  ({ ...props }: InputLineProps, ref: React.ForwardedRef<null>) => {
    return <input className={InputLineDefaultStyle} {...props} ref={ref} />;
  }
);

export default InputLine;

const InputLineDefaultStyle = css({
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
