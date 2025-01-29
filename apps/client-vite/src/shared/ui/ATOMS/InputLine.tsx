import { forwardRef, InputHTMLAttributes } from 'react';

type InputLineProps = InputHTMLAttributes<HTMLInputElement>;

const InputLine = forwardRef(
  ({ ...props }: InputLineProps, ref: React.ForwardedRef<null>) => {
    return <input {...props} ref={ref} />;
  }
);

export default InputLine;
