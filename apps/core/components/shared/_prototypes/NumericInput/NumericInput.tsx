import { InputHTMLAttributes } from 'react';

type NumericInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'inputMode' | 'onInput'
>;

const NumericInput = ({ ...props }: NumericInputProps) => (
  <input
    type="text"
    inputMode="numeric"
    {...props}
    onInput={(e) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
    }}
  />
);

export default NumericInput;
