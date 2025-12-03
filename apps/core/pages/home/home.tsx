import { css } from '@styled-system/css';
import FlowCarousel from 'src/widgets/home/ui/ORGANISMS/FlowCarousel';

const Home = () => {
  return (
    <>
      <div className={HomeDefaultStyle}>
        <div style={{ width: '100%' }}>
          <FlowCarousel />
        </div>
        <div>대충 홈 화면 내용</div>
      </div>
    </>
  );
};

export default Home;

const HomeDefaultStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});
