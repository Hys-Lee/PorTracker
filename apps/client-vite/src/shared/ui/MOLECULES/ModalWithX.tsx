import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@styled-system/css';
import ReactModal, { Props } from 'react-modal';
interface ModalProps extends Props {
  children: ReactNode;
  onClose: () => void;
}

// Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
//   children: ReactNode;
//   isOpen: boolean;
//   parent?: HTMLElement;
//   style?: { overlay: HTMLStyleElement; content: HTMLStyleElement };
// }

const Modal = ({ children, onClose, ...props }: ModalProps) => {
  return (
    <ReactModal
      {...props}
      onRequestClose={onClose}
      className={modalDefaultStyle}
    >
      <div
        style={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <button
            style={{
              height: '20px',
              width: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            className={buttonStyle}
            onClick={onClose}
          >
            <p style={{ lineHeight: '100%', height: '100%' }}>
              x{/** 임시 X */}
            </p>
          </button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;

// 대충 기본 스타일도 입히기
const modalDefaultStyle = css({
  // '& button': {
  //   background: 'black',
  // },
  // position: 'fixed',
  // rounded: 'md',
  // background: 'rgb(0,0,0,0.1)',
  // width: '100%',
  // height: '100%',
  // top: '0', // fixed에서도 화면 꽉차게 만드려고
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
});

const buttonStyle = css({
  rounded: 'md',
  '&:hover': {
    background: 'rgb(0,0,0,0.1)',
  },
});
