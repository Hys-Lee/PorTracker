import { FC, InputHTMLAttributes } from 'react';

type InputLineProps = InputHTMLAttributes<HTMLInputElement>;

const InputLine: FC<InputLineProps> = ({ ...props }) => {
  return <input {...props} />;
};

export default InputLine;
