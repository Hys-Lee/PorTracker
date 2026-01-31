import * as stylex from '@stylexjs/stylex';
import { colors } from '../tokens/colors.stylex';

export const inputBase = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    // borderRadius: '24px',
    padding: '0 15px',
    fontSize: '16px',
    // fontWeight: '600',
    fontWeight: '500',
    lineHeight: 1,
    height: '48px',
    width: '300px',
    gap: '5px',
    borderStyle: 'none',
    outline: 'none',
    boxShadow: {
      default: 'none',
      ':focus-visible': `inset 0 0 0 1px ${colors.primary}`,
    },
    backgroundColor: {
      default: colors.bgNormal,
      ':hover': colors.bgStrong,
    },
    color: colors.textNormal,
  },
});
