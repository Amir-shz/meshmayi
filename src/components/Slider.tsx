"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { NextSliderButton, PrevSliderButton } from "@/components/SliderButton";
// import SliderItem from "./SliderItem";

function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className=" relative z-50 mx-auto h-full w-full overflow-hidden"
      >
        {/* {data.map((item) => ( */}
        <SwiperSlide className=" h-auto bg-slate-300">
          <p>slide1</p>
        </SwiperSlide>

        <SwiperSlide className=" h-auto bg-slate-300">
          <p>slide2</p>
        </SwiperSlide>

        <SwiperSlide className=" h-auto bg-slate-300">
          <p>slide3</p>
        </SwiperSlide>
        {/* ))} */}
        <NextSliderButton />
        <PrevSliderButton />
      </Swiper>
    </>
  );
}

export default Slider;
