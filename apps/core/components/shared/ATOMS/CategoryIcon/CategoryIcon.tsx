import { colors } from '../../../../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';
interface CatgoryIconProps {
  text: string;
  iconStylex?: stylex.StyleXStyles;
}
const CategoryIcon = ({ text, iconStylex }: CatgoryIconProps) => {
  return (
    <div {...stylex.props(iconStyles.base, iconStylex)}>
      <span {...stylex.props(iconStyles.innerText)}>{text.slice(0, 4)}</span>
    </div>
  );
};
export default CategoryIcon;

const iconStyles = stylex.create({
  base: {
    width: '40px',
    height: '40px',
    borderRadius: '16px',
    color: colors.category1Strong,
    backgroundColor: colors.category1Week,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    // justifyContent: 'start',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: '900',
    padding: '4px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
  },
  innerText: {
    width: 'inherit',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-around',
  },
});
