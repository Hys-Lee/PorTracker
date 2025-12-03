import { css } from '@styled-system/css';
import { HTMLAttributes } from 'react';

type DividingLineProps = HTMLAttributes<HTMLDivElement>;

const DividingLine = ({ ...props }: DividingLineProps) => {
  return (
    <div
      {...props}
      className={`${DividingLineDefaultStyle} ${props?.className ?? ''}`}
    ></div>
  );
};

const DividingLineDefaultStyle = css({
  width: '100%',
  height: '1px',
  background: '#d8d8d8',
});

export default DividingLine;
