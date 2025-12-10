import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import { Separator as RadixSeparator } from 'radix-ui';

export interface SeperatoroProps extends RadixSeparator.SeparatorProps {
  color: 'week' | 'normal' | 'strong';
}

const Separator = ({ color }: SeperatoroProps) => {
  return (
    <>
      <RadixSeparator.Root
        orientation="horizontal"
        {...stylex.props(styles.base, styles[color])}
      />
    </>
  );
};

export default Separator;

const styles = stylex.create({
  base: {
    width: '100%',
    height: '1px',
  },

  week: { backgroundColor: colors.bgWeek },
  normal: { backgroundColor: colors.bgNormal },
  strong: { backgroundColor: colors.bgStrong },
});
