import { FormHTMLAttributes, ReactNode } from 'react';

interface CompoundFormMainProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

const CompoundFormMain = ({ children }: CompoundFormMainProps) => {
  return (
    <>
      <form>{children}</form>
    </>
  );
};

export default CompoundFormMain;
