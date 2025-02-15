import { css } from '@styled-system/css';
import { FallbackProps } from 'react-error-boundary';

const DefaultErrorSection = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.error(error);
  return (
    <>
      <div className={DefaultErrorStyle}>
        <p>예상치 못한 문제가 발생했습니다</p>
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

export default DefaultErrorSection;

const DefaultErrorStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
