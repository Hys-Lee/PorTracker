import { colors } from '../../../../tokens/colors.stylex';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
import { ReactNode } from 'react';
interface FormModalFrameProps {
  onClose: () => void;
  children: ReactNode;
  frameStylex?: stylex.StyleXStyles;
  closeButtonStylex?: stylex.StyleXStyles;
}

const FormModalFrame = ({
  onClose,
  children,
  closeButtonStylex,
  frameStylex,
}: FormModalFrameProps) => {
  return (
    <div {...stylex.props(frameStyels.base, frameStylex)}>
      <div
        {...stylex.props(crossStyles.base, closeButtonStylex)}
        onClick={() => onClose()}
      >
        <Cross2Icon width={'100%'} height={'100%'} />
      </div>
      {children}
    </div>
  );
};

export default FormModalFrame;

const frameStyels = stylex.create({
  base: {
    position: 'relative',
    borderRadius: '24px',
    width: '800px',
    height: '500px',
    backgroundColor: colors.bgWeek,
    padding: '32px',
    boxShadow: `0 0 4px 1px var(--gray-b-s)`,
  },
});

const crossStyles = stylex.create({
  base: {
    position: 'absolute',
    left: '32px',
    top: '32px',
    width: '24px',
    height: '24px',
    color: colors.iconFilter,
  },
});
