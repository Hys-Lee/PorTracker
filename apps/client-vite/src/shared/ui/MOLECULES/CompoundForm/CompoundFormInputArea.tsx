import { css } from '@styled-system/css';
import InputArea from '../../ATOMS/InputArea';
import { TextareaHTMLAttributes } from 'react';

// 그냥 기본 디자인 넣기 위해

interface InputAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}
const CompoundFormInputArea = ({ value, ...props }: InputAreaProps) => {
  return (
    <>
      <InputArea
        value={value}
        className={compoundFormInputAreaStyle}
        {...props}
      />
    </>
  );
};
export default CompoundFormInputArea;

const compoundFormInputAreaStyle = css({
  resize: 'none',
  overflowY: 'auto',
});
