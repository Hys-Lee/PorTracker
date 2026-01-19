import { MEMO_IMPORTANCE_MAP } from '@core/constants';
import { colors } from '../../../../tokens/colors.stylex';
import { MemoImportanceValue } from '@core/types';
import { memoImportanceIconSelector } from '@core/utils/renderers/iconSelector';

import * as stylex from '@stylexjs/stylex';

interface MemoPillProps {
  type: MemoImportanceValue;
  wrapperStylex?: stylex.StyleXStyles;
}

const MemoPill = ({ type, wrapperStylex }: MemoPillProps) => {
  return (
    <span {...stylex.props(pillStyles.base, pillStyles[type], wrapperStylex)}>
      <div style={{ width: '16px', height: '16px' }}>
        {memoImportanceIconSelector(type, 16, 16, iconStyles[type])}
      </div>
      <span style={{ lineHeight: 1 }}>{MEMO_IMPORTANCE_MAP[type]}</span>
    </span>
  );
};

const pillStyles = stylex.create({
  base: {
    padding: '8px 12px',
    paddingRight: '16px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'end',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: 1,
    gap: '8px',
    width: 'max-content',
    // opacity: 0.5,
    // justifyContent: 'center',
  },
  critical: {
    backgroundColor: `rgb(from ${colors.iconMemoImportanceHigh} r g b / 0.2)`,
    color: colors.iconMemoImportanceHigh,
    // color: `color-mix(in srgb,${colors.iconMemoImportanceHigh},black 20%)`,
  },
  useful: {
    backgroundColor: `rgb(from ${colors.iconMemoImportanceMiddle} r g b / 0.2)`,
    // color: `color-mix(in srgb,${colors.iconMemoImportanceMiddle},black 20%)`,
    color: colors.iconMemoImportanceMiddle,
  },
  normal: {
    // backgroundColor: `rgb(from ${colors.iconMemoImportanceLow} r g b / 1)`,
    backgroundColor: `rgb(from ${colors.iconMemoImportanceLow} r g b / 0.2)`,
    // color: `color-mix(in srgb,${colors.iconMemoImportanceLow},black 20%)`,
    color: colors.iconMemoImportanceLow,
  },
});

const iconStyles = stylex.create({
  critical: {
    // color: `color-mix(in srgb,${colors.iconMemoImportanceHigh},black 20%)`,
  },
  useful: {
    // color: `color-mix(in srgb,${colors.iconMemoImportanceMiddle},black 20%)`,
  },
  normal: {
    // color: `color-mix(in srgb,${colors.iconMemoImportanceLow},black 20%)`,
  },
});

export default MemoPill;
