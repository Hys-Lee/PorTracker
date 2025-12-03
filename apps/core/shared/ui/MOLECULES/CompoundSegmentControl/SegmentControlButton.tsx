import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, css } from '@styled-system/css';
import {} from '@styled-system/tokens';
import Text from '../../ATOMS/Text';

interface SegmentControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  textContent: string;
  activated?: boolean;
}
const SegmentControlButton = ({
  children,
  textContent,
  activated = false,
  ...props
}: SegmentControlButtonProps) => {
  return (
    <button
      {...props}
      className={`${buttonDefaultStyle({
        bg: activated ? 'activated' : 'unactivated',
      })}
      ${props?.className ?? ''}
    `}
    >
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

const buttonDefaultStyle = cva({
  base: {
    rounded: 'md',
    cursor: 'pointer',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    bg: {
      activated: {
        bg: 'white',
      },
      unactivated: {
        bg: 'transparent',
      },
    },
  },
});

const buttonTextDefaultStyle = css({
  fontWeight: 'medium',
  fontSize: 'md',
});
