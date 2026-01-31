import { colors } from '../../../../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';
interface TagPillProps {
  externalStylex?: stylex.StyleXStyles;
  content: string;
}
const TagPill = ({ externalStylex, content }: TagPillProps) => {
  return (
    <div {...stylex.props(tagPillStyles.base, externalStylex)}>{content}</div>
  );
};

const tagPillStyles = stylex.create({
  base: {
    backgroundColor: `rgb(from ${colors.primary} r g b / 0.3)`,
    color: colors.textPrimary,
    // borderRadius: '24px',
    fontSize: '12px',
    // padding: '6px 8px',
    width: 'fit-content',
    whiteSpace: 'nowrap',
    borderRadius: '8px',
    padding: '4px 6px',
  },
});

export default TagPill;
