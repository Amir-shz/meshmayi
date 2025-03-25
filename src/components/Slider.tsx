"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { NextSliderButton, PrevSliderButton } from "@/components/SliderButton";
import Image from "next/image";

interface sliderProps {
  pictures: { _id: string; src: string }[];
  onChangeSlide?: (num: number) => void;
}

function Slider({ pictures, onChangeSlide = () => {} }: sliderProps) {
  function handleSlideChange(e: SwiperClass) {
    onChangeSlide(e.activeIndex);
  }

  return (
    <>
      <Swiper
        onSlideChange={handleSlideChange}
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
        {pictures.length === 0 && (
          <SwiperSlide className=" h-full  w-full bg-primary-50">
            <p className=" flex justify-center items-center w-full aspect-[2/1]">
              تصویری وجود ندارد
            </p>
          </SwiperSlide>
        )}
        {pictures.map((picture) => (
          <SwiperSlide key={picture._id} className=" h-full">
            <Image
              src={picture.src}
              alt="car"
              width={250}
              height={250}
              className=" aspect-[2/1]  object-cover object-center w-full"
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
