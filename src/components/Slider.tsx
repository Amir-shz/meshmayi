"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { NextSliderButton, PrevSliderButton } from "@/components/SliderButton";
import Image from "next/image";
// import SliderItem from "./SliderItem";

interface sliderProps {
  pictures: { _id: string; src: string }[];
}

function Slider({ pictures }: sliderProps) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
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
        {pictures.map((picture) => (
          <SwiperSlide key={picture._id} className=" h-auto">
            <Image
              src={picture.src}
              alt="car"
              width={250}
              height={250}
              className=" object-cover object-center w-full"
            />
          </SwiperSlide>
        ))}

        {pictures.length > 1 && (
          <>
            <NextSliderButton />
            <PrevSliderButton />
          </>
        )}
      </Swiper>
    </>
  );
}

export default Slider;
