import { ButtonHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import Text from '../../ATOMS/Text';

interface CompoundFormButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const CompoundFormButton = ({
  children,
  ...props
}: CompoundFormButtonProps) => {
  return (
    <>
      <button {...props}>{children}</button>
    </>
  );
};
export default CompoundFormButton;
