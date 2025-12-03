import { LabelHTMLAttributes } from 'react';
import Text from '../../ATOMS/Text';

interface CompountFormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  textContent: string;
}
const CompoundFormLabel = ({
  textContent,
  htmlFor,
  ...props
}: CompountFormLabelProps) => {
  return (
    <>
      <label htmlFor={htmlFor} {...props}>
        <Text as="p" textContent={textContent} />
      </label>
    </>
  );
};
export default CompoundFormLabel;
