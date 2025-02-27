import { css } from '@styled-system/css';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ActionButton = ({ children, ...props }: ActionButtonProps) => {
  return (
    <>
      <button className={ActionButtonDefaultStyle} {...props}>
        {children}
      </button>
    </>
  );
};
export default ActionButton;

const ActionButtonDefaultStyle = css({
  background: 'linear-gradient(to left top,#8cdeba,#8cdec5,#8cdade)', //'#a6decd', //'linear-gradient(to left top, #c5f0d6 0%, #b5e6d9,#c5e5f0 100%)', //'#b5e6d9', // 뱅샐,토스,배민 하고 안겹치는 청록 - 옥색?
  color: 'white',
  fontWeight: 'bold',
  fontSize: 'md',
  rounded: 'md',
  height: '12',
  width: '72',
});
