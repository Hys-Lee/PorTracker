import { css } from '@styled-system/css';
import InputArea from '../../ATOMS/InputArea';
import { forwardRef, TextareaHTMLAttributes, useRef } from 'react';

// 그냥 기본 디자인 넣기 위해

type InputAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const CompoundFormInputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  (
    { ...props }: InputAreaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <>
        {/* <textarea ref={ref} /> */}
        <InputArea
          ref={ref}
          // value={value}
          className={InputAreaDefaultStyle}
          {...props}
        />
      </>
    );
  }
);
export default CompoundFormInputArea;
const InputAreaDefaultStyle = css({
  whiteSpace: 'pre-wrap',
  boxSizing: 'content-box',
  padding: '12px',
  height: '100% !important',
  // width: '100%',
  overflowY: 'auto ',
  resize: 'none',
  outline: '2px solid rgb(230,230,230) !important',
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
