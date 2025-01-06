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
  bg: 'gray.800',
  rounded: 'md',
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
});
