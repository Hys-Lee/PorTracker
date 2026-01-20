'use client';

import MemoPill from '@core/components/shared/ATOMS/MemoPill/MemoPill';
import { colors } from '../../../../tokens/colors.stylex';
import { MemoImportanceValue, MemoTypeValue } from '@core/types';
import { dateFormatter } from '@core/utils/helpers/dateFormatter';

import * as stylex from '@stylexjs/stylex';
import { date } from 'zod';
import { MEMO_IMPORTANCE_MAP, MEMO_TYPE_MAP } from '@core/constants';
import TagPill from '@core/components/shared/ATOMS/TagPill/TagPill';
import Separator from '@core/components/shared/ATOMS/Separator/Separator';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface MemoTableProps {
  memoData: (TileProps & { memoId: string })[];
  modalParam: string;
}

const MemoTable = ({ memoData, modalParam }: MemoTableProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      <section {...stylex.props(memoTaleStyles.base)}>
        {memoData.map((data) => {
          const params = new URLSearchParams(searchParams);
          params.set(modalParam, data.memoId);
          const href = `${pathname}?${params.toString()}`;
          return (
            <Link
              key={data.memoId}
              href={href}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Tile {...data} />
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default MemoTable;

const memoTaleStyles = stylex.create({
  base: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
});

interface TileProps {
  title: string;
  content: string;
  importance: MemoImportanceValue;
  date: Date;
  type: MemoTypeValue;
  tags: string[];
}
const Tile = ({ content, date, importance, title, type, tags }: TileProps) => {
  return (
    <>
      <div {...stylex.props(memoTileStyles.wrapper)}>
        <div {...stylex.props(memoTileStyles.dateBox)}>
          <p {...stylex.props(memoTileStyles.dateText)}>
            {dateFormatter(date, 'YYYY.MM.DD', '.')}
          </p>
          <div {...stylex.props(memoTileStyles.memoTypeBox)}>
            <p {...stylex.props(memoTileStyles.memoTypeText)}>
              {`${MEMO_TYPE_MAP[type]}${type !== 'event' ? ' Linked' : ''}`}
            </p>
          </div>
        </div>

        <div {...stylex.props(memoTileStyles.header)}>
          <MemoPill
            type={importance}
            wrapperStylex={memoTileStyles.importancePill}
            icon={false}
          />

          <h4 {...stylex.props(memoTileStyles.title)}>{title} </h4>
        </div>

        <p {...stylex.props(memoTileStyles.content)}>{content}</p>
        <div {...stylex.props(memoTileStyles.tagArea)}>
          {tags.slice(0, 2).map((tag) => (
            <TagPill content={tag} externalStylex={memoTileStyles.tagPill} />
          ))}
        </div>
      </div>
    </>
  );
};

const memoTileStyles = stylex.create({
  wrapper: {
    borderRadius: '8px',
    boxShadow: `0 0 0 2px ${colors.bgNormal}`,
    width: '240px',
    height: '280px',
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr auto',
    justifyItems: 'center',
    padding: '16px',
    gridGap: '12px',
  },
  dateBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dateText: {
    fontSize: '12px',
    color: colors.textNormal,
    margin: 0,
  },
  header: {
    paddingTop: '8px',
    width: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
    height: 'auto',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.textStrong,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    minWidth: '0%',
    display: 'inline-block',
    margin: '0',
  },
  content: {
    fontSize: '14px',
    color: colors.textNormal,
    whiteSpace: 'pre-wrap',
    width: '100%',
    margin: 0,
    overflow: 'hidden',
    flexGrow: 1,
  },
  importancePill: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
    paddingRight: '0px',
    backgroundColor: 'none',
    justifyContent: 'center',
    fontSize: '12px',
    borderRadius: '8px',
  },

  tagPill: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  tagArea: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    gap: '8px',
    width: '100%',
    whiteSpace: 'nowrap',
    paddingTop: '8px',
  },
  memoTypeBox: {
    padding: '2px 8px',
    boxShadow: `0 0 0 1px rgb(from ${colors.secondary} r g b / 0.3)`,
    borderRadius: '4px',
  },
  memoTypeText: {
    margin: 0,
    fontSize: '12px',
    color: colors.textNormal,
    fontWeight: '600',
  },
});
