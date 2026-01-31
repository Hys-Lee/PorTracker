import * as stylex from '@stylexjs/stylex';
import { colors } from '../tokens/colors.stylex';

export const pasteButtonStyles = stylex.create({
  base: {
    backgroundColor: {
      default: colors.bgWeek,
      ':hover': colors.bgNormal,
      ':focus': colors.bgNormal,
    },
    borderRadius: '12px',
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: '12px',
    right: '12px',
    // background: 'none',
    borderStyle: 'none',
    color: colors.iconFilter,
  },
});
