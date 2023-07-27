import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Image } from "@chakra-ui/react";

const ProductSlider = () => {
  return (
    <>
      <Swiper
        navigation={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 1000,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation]}
      >
        <SwiperSlide className='slider-product'>
          <Image
            src='/skillful-cv2.png'
            width={1200}
            rounded={"xl"}
            // height={710}
            alt='skillful-cv'
          />
        </SwiperSlide>
        <SwiperSlide className='slider-product'>
          <Image
            rounded={"xl"}
            src='/skillful-cv1.png'
            width={1152}
            // height={710}
            alt='skillful-cv'
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ProductSlider;
