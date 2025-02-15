import { css } from '@styled-system/css';
import { FallbackProps } from 'react-error-boundary';

const NetworkErrorSection = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.error(error);
  return (
    <>
      <div className={NetworkErrorStyle}>
        <p>연결상태가 좋지 않습니다</p>
        <button
          className={css({
            rounded: 'md',
          })}
          onClick={resetErrorBoundary}
        >
          다시 시도
        </button>
      </div>
    </>
  );
};

export default NetworkErrorSection;

const NetworkErrorStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
