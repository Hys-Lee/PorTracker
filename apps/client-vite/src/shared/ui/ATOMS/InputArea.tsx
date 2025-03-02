import { css } from '@styled-system/css';
import { FC, forwardRef, TextareaHTMLAttributes } from 'react';

type InputAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({ style, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={`${InputAreaDefaultStyle} ${props.className}`}
        wrap="hard"
      />
    );
  }
);

const InputAreaDefaultStyle = css({
  whiteSpace: 'pre-wrap',
});

export default InputArea;
