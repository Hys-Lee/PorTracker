import { HTMLAttributes, ReactNode } from 'react';
import { css } from '@styled-system/css';
interface TileProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Tile = ({ children, ...props }: TileProps) => {
  return (
    <div className={TileDefaultStyle} {...props}>
      {children}
    </div>
  );
};
export default Tile;

const TileDefaultStyle = css({
  rounded: 'lg',
  border: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
