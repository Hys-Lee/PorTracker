import { Dialog, VisuallyHidden } from 'radix-ui';

import { colors } from '../../../../tokens/colors.stylex';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
import { cloneElement, ReactElement, ReactNode } from 'react';
interface FormModalFrameProps {
  onClose?: () => void;
  asClose?: ReactElement;
  children: ReactNode;
  frameStylex?: stylex.StyleXStyles;
  closeButtonStylex?: stylex.StyleXStyles;

  /** Redix Dialog관련 */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
}

const FormModalFrame = ({
  onClose,
  asClose = undefined,
  children,
  closeButtonStylex,
  frameStylex,
  open,
  onOpenChange,
  defaultOpen,
  modal,
}: FormModalFrameProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          title=""
          // asChild
          style={{
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          }}
        >
          <VisuallyHidden.Root>
            <Dialog.Title></Dialog.Title>
          </VisuallyHidden.Root>
          <div {...stylex.props(frameStyels.base, frameStylex)}>
            {asClose ? (
              cloneElement(asClose, {
                onClick: () => onClose && onClose(),
                className: stylex.props(crossStyles.base, closeButtonStylex)
                  .className,
                children: <Cross2Icon width={'100%'} height={'100%'} />,
              })
            ) : (
              <Dialog.Close asChild>
                <div
                  {...stylex.props(crossStyles.base, closeButtonStylex)}
                  onClick={() => onClose && onClose()}
                >
                  <Cross2Icon width={'100%'} height={'100%'} />
                </div>
              </Dialog.Close>
            )}

            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
