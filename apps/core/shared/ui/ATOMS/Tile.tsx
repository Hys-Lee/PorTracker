import { HTMLAttributes, ReactNode } from 'react';
import { css } from '@styled-system/css';
export interface TileProps extends HTMLAttributes<HTMLDivElement> {
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
  rounded: '2xl',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bg: 'white',
});
