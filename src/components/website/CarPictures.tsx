"use client";

import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/thumbs";
import PicturesModal from "./PicturesModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { Swiper as swiperType } from "swiper/types";

function CarPictures({
  pictures,
}: {
  pictures: { src: string; _id: string }[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | swiperType>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div>
        <Swiper
          allowTouchMove={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
          className=" rounded-xl mb-2 h-72 col-span-full"
        >
          {pictures.length === 0 && (
            <SwiperSlide className=" size-full bg-primary-50">
              <p className=" size-full flex justify-center items-center text-primary-700 font-semibold text-lg">
                تصویری وجود ندارد
              </p>
            </SwiperSlide>
          )}
          {pictures.slice(0, 4).map((picture, index) => (
            <SwiperSlide key={picture._id} className=" h-full">
              <Image
                width={1280}
                height={1280}
                src={picture.src}
                alt={`Car ${index + 1}`}
                className=" h-full object-cover object-center w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`grid grid-cols-5 gap-8 ${
            pictures.length === 0 && "hidden"
          }`}
        >
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={32}
            modules={[Thumbs]}
            className="h-12 col-span-4 w-full"
          >
            {pictures.slice(0, 4).map((picture, index) => (
              <SwiperSlide
                key={picture._id}
                className=" h-full rounded overflow-hidden "
              >
                <Image
                  width={1280}
                  height={1280}
                  src={picture.src}
                  alt={`Car ${index + 1}`}
                  className=" h-full object-cover object-center w-full cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {pictures.length > 4 && (
            <button
              onClick={() => setIsOpen(true)}
              className="rounded border border-neutral-400 bg-neutral-200 text-neutral-400 text-p4_M_desktop size-full"
            >
              عکس‌های بیشتر
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <PicturesModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pictures={pictures}
        />
      )}
    </>
  );
}

export default CarPictures;
