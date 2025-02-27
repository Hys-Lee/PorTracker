import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@styled-system/css';
import ReactModal, { Props, Styles } from 'react-modal';
interface ModalProps extends Props {
  children: ReactNode;
  onClose: () => void;
  headerContents?: ReactNode[];
}

// Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
//   children: ReactNode;
//   isOpen: boolean;
//   parent?: HTMLElement;
//   style?: { overlay: HTMLStyleElement; content: HTMLStyleElement };
// }

const Modal = ({ children, onClose, headerContents, ...props }: ModalProps) => {
  return (
    <ReactModal
      onRequestClose={onClose}
      style={{
        overlay: {
          overflow: 'scroll',
          scrollbarWidth: 'none',
          background: 'rgba(0,0,0,0.5)',
          padding: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          position: 'unset',
          borderRadius: '16px',
          overflow: 'hidden',
          height: 'auto',
          maxWidth: '1200px',
          width: '100%',
          minWidth: '600px',
        },
      }}
      {...props}
    >
      <div className={ModalContentContainerStyle}>
        <div className={ModalHeaderStyle}>
          <button className={ButtonStyle} onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="rgb(120, 127, 126)"
                fill-rule="evenodd"
                d="M13.815 12l5.651-5.651a1.2 1.2 0 00-1.697-1.698l-5.651 5.652-5.652-5.652a1.201 1.201 0 00-1.697 1.698L10.421 12l-5.652 5.651a1.202 1.202 0 00.849 2.049c.307 0 .614-.117.848-.351l5.652-5.652 5.651 5.652a1.198 1.198 0 001.697 0 1.2 1.2 0 000-1.698L13.815 12z"
              ></path>
            </svg>
          </button>
          {headerContents}
        </div>
        <main className={ModalMainContentContainerStyle}>{children}</main>
      </div>
    </ReactModal>
  );
};

export default Modal;

const ModalMainContentContainerStyle = css({
  padding: '32px',
});

const ModalContentContainerStyle = css({
  padding: '4px',
  display: 'flex',
  flexDirection: 'column',
});

const ModalHeaderStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ButtonStyle = css({
  height: '24px',
  width: '24px',
  padding: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  rounded: 'md',
  '&:hover': {
    background: 'rgb(100,100,100,0.1)',
  },
});
