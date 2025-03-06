import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, css } from '@styled-system/css';
import {} from '@styled-system/tokens';
import Text from '../../ATOMS/Text';

interface SegmentControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  textContent: string;
}
const SegmentControlButton = ({
  children,
  textContent,
  ...props
}: SegmentControlButtonProps) => {
  return (
    <button className={buttonDefaultStyle} {...props}>
      {/* {children} */}
      <Text
        as="p"
        textContent={textContent}
        className={buttonTextDefaultStyle}
      />
    </button>
  );
};
export default SegmentControlButton;

const buttonDefaultStyle = css({
  bg: 'white',
  rounded: 'md',
  cursor: 'pointer',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const buttonTextDefaultStyle = css({
  fontWeight: 'medium',
  fontSize: 'md',
});
