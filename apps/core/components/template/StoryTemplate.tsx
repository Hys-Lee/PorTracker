import * as stylex from '@stylexjs/stylex';
import { tokens } from './tokens.stylex';
const styles = stylex.create({
  base: {
    backgroundColor: tokens.primary,
  },
  large: {
    width: '80px',
  },
});

const StoryTemplate = ({ xstyle }: { xstyle?: stylex.StyleXStyles }) => {
  return (
    <>
      <p className="">쉬바!</p>
      <div {...stylex.props(styles.base, styles['large'])}>스토리 템플릿!</div>
    </>
  );
};

export default StoryTemplate;
