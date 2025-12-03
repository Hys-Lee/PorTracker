import { css } from '@styled-system/css';
import { Link } from 'react-router';

// type RouteErrorSectionProps = Partial<FallbackProps>;

const RouteErrorSection = () => {
  return (
    <>
      <div className={RouteErrorStyle}>
        <p>존재하지 않는 페이지입니다!</p>
        <button
          className={css({
            rounded: 'md',
          })}
        >
          <Link to="/">홈으로 이동하기</Link>
        </button>
      </div>
    </>
  );
};

export default RouteErrorSection;

const RouteErrorStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
