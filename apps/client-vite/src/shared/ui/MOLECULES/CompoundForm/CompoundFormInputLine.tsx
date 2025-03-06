import { css } from '@styled-system/css';
import InputLine from '../../ATOMS/InputLine';
import {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useRef,
} from 'react';

// 그냥 기본 디자인 넣기 위해

type InputLineProps = InputHTMLAttributes<HTMLInputElement>;
const CompoundFormInputLine = forwardRef<HTMLInputElement, InputLineProps>(
  ({ ...props }, ref) => {
    return (
      <>
        <InputLine
          ref={ref}
          // value={value}
          {...props}
          className={`${InputLineDefaultStyle} ${props.className}`}
        />
      </>
    );
  }
);

const InputLineDefaultStyle = css({
  //   background: 'black',
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

export default CompoundFormInputLine;
