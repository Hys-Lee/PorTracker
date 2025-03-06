import { css } from '@styled-system/css';
import {
  Children,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from 'react';

interface SegmentControlMainProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
const SegmentControlMain = ({
  children,
  ...props
}: SegmentControlMainProps) => {
  //   const childrenArray = Children.toArray(children);

  return (
    <div className={controlMainDefaultStyle} {...props}>
      {children}
    </div>
  );
};
export default SegmentControlMain;

const controlMainDefaultStyle = css({
  bg: 'neutral.300',
  rounded: 'md',
  padding: '1px',
  // gap: '2px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});
