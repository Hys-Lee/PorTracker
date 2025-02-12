import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { css } from '@styled-system/css';

const FlowCarousel = () => {
  return (
    <>
      <Swiper
        modules={[Navigation]}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        className={flowCarouselStyle}
      >
        <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}>
          1
        </SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
      </Swiper>
    </>
  );
};
export default FlowCarousel;

const flowCarouselStyle = css({
  border: 'solid 1px black',
  width: '100%',
});
