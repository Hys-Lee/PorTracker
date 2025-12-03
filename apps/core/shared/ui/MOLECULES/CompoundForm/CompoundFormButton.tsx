import { ButtonHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import Text from '../../ATOMS/Text';
import ActionButton from '../../ATOMS/ActionButton';

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
      <ActionButton {...props}>{children}</ActionButton>
      {/* <button {...props}>{children}</button> */}
    </>
  );
};
export default CompoundFormButton;
