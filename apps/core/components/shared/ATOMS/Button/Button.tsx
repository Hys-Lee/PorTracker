import { ButtonHTMLAttributes } from 'react';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outlined';
  rounded?: 'normal' | 'huge';
  buttonStylex?: stylex.StyleXStyles;
}
const Button = ({ variant, rounded, buttonStylex, ...props }: ButtonProps) => {
  return (
    <>
      <button
        {...props}
        className={`${
          stylex.props(
            buttonStyles.base,
            variant ? buttonStyles[variant] : undefined,
            rounded
              ? buttonStyles[
                  rounded === 'normal' ? 'radiusNormal' : 'radiusHuge'
                ]
              : undefined,
            buttonStylex
          ).className
        } ${props.className}`}
      >
        {props.children}
      </button>
    </>
  );
};
export default Button;

const buttonStyles = stylex.create({
  base: {
    borderStyle: 'none',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: '600',
  },
  solid: {
    borderStyle: 'none',
    backgroundColor: {
      default: colors.primary,
      ':hover': `rgb(from var(--jade-p) r g b / 0.7)`,
      ':focus-visible': `rgb(from var(--jade-p) r g b / 0.7)`,
    },
    color: 'white',
  },
  outlined: {
    backgroundColor: {
      default: colors.bgWeek,
      ':hover': colors.bgNormal,
      ':focus-visible': colors.bgNormal,
    },
    boxShadow: {
      default: `inset 0 0 0px 1px ${colors.primary}`,
      ':hover': `inset 0 0 0 1px rgb(from var(--jade-t) r g b / 0.7)`,
      ':focus-visible': `inset 0 0 0 1px rgb(from var(--jade-t) r g b / 0.7)`,
    },
  },
  radiusNormal: { borderRadius: '12px' },
  radiusHuge: { borderRadius: '24px' },
});
