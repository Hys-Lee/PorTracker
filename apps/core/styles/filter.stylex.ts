import { colors } from '../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';

export const filterWrapperStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    minWidth: 'min-content',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: `0 0 0 1px rgb(from var(--gray-b-s) r g b / 1)`,
    // padding: '4px',
    padding: '8px',
  },
});

export const AssetFilterStyles = stylex.create({
  base: {
    height: '36px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'start',
    width: '250px',
  },
});

export const DateFilterStyles = stylex.create({
  base: {
    height: '36px',
    // fontSize: '14px', // Antd 기본 14라서... 걍 얘에 맞춤
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'start',
    width: '250px',
  },
});

export const TransactionFilterStyles = stylex.create({
  base: {
    height: '36px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'start',
    width: '200px',
    minWidth: '200px',
  },
});

export const switchStyles = stylex.create({
  base: {
    backgroundColor: colors.bgStrong,
    whiteSpace: 'nowrap',
  },
});
