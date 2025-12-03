import { forwardRef, InputHTMLAttributes } from 'react';

type InputLineProps = InputHTMLAttributes<HTMLInputElement>;

const InputLine = forwardRef<HTMLInputElement, InputLineProps>(
  ({ ...props }, ref) => {
    return <input {...props} ref={ref} />;
  }
);

export default InputLine;
