import { FormHTMLAttributes, ReactNode } from 'react';

interface CompoundFormMainProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

const CompoundFormMain = ({ children, ...props }: CompoundFormMainProps) => {
  return (
    <>
      <form {...props}>{children}</form>
    </>
  );
};

export default CompoundFormMain;
