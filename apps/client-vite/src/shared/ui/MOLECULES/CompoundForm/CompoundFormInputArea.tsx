import { css } from '@styled-system/css';
import InputArea from '../../ATOMS/InputArea';
import { forwardRef, TextareaHTMLAttributes } from 'react';

// 그냥 기본 디자인 넣기 위해

type InputAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const CompoundFormInputArea = forwardRef(
  ({ ...props }: InputAreaProps, ref: React.ForwardedRef<null>) => {
    return (
      <>
        <InputArea
          ref={ref}
          // value={value}
          className={compoundFormInputAreaStyle}
          {...props}
        />
      </>
    );
  }
);
export default CompoundFormInputArea;

const compoundFormInputAreaStyle = css({
  resize: 'none',
  overflowY: 'auto',
});
