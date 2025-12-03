import { HTMLAttributes, useState } from 'react';
import Tile, { TileProps } from 'src/shared/ui/ATOMS/Tile';
interface MemoTileProps extends HTMLAttributes<HTMLDivElement> {
  date: string;
  portfolioType: string;
  title: string;
  asset: string;
  content: string;
}

const MemoTile = ({
  date,
  portfolioType,
  title,
  asset,
  content,
  ...props
}: MemoTileProps) => {
  return (
    <>
      <Tile style={{ width: '120px', height: '150px' }} {...props}>
        <div>
          <p>{date}</p>
          <div>{portfolioType}</div>
        </div>
        <div>
          <p>{title}</p>
          <p>{asset}</p>
          <p>{content}</p>
        </div>
      </Tile>
    </>
  );
};

export default MemoTile;
