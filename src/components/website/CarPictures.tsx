"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { HiX } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
// import { NextSliderButton, PrevSliderButton } from "../SliderButton";

function CarPictures({
  pictures,
}: {
  pictures: { src: string; _id: string }[];
}) {
  const [activePic, setActivePic] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperType>(null);

  return (
    <>
      <div>
        {activePic ? (
          <Image
            width={640}
            height={640}
            src={activePic}
            alt="car picture"
            className=" rounded-xl mb-2 h-72"
          />
        ) : pictures[0]?.src ? (
          <Image
            width={640}
            height={640}
            src={pictures[0].src}
            alt="car picture"
            className=" rounded-xl mb-2 h-72"
          />
        ) : (
          <div className="rounded-xl mb-2 h-72 bg-primary-50 flex items-center justify-center">
            تصویری وجود ندارد
          </div>
        )}

        <div className="grid grid-cols-5 gap-8">
          {pictures.slice(0, 4).map((picture) => (
            <Image
              key={picture._id}
              src={picture.src}
              width={200}
              height={200}
              alt="car picture"
              onClick={() => setActivePic(picture.src)}
              className=" rounded border border-neutral-400 h-12 cursor-pointer"
            />
          ))}
          {pictures.length > 4 && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded border border-neutral-400 bg-neutral-200 text-neutral-400 text-p4_M_desktop size-full"
            >
              عکس‌های بیشتر
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-neutral-50/[0.01] dialog__overlay">
              <DialogContent
                style={{ maxWidth: "1280px" }}
                className="[&>button]:hidden backdrop-blur-sm w-[50rem] overflow-x-hidden"
              >
                <DialogTitle className="hidden"></DialogTitle>
                <div className=" grid grid-cols-1  w-full">
                  <div className="flex flex-row-reverse">
                    <HiX
                      className=" size-6 cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <div className=" col-span-full pt-6 px-6 pb-3 rounded-xl ">
                    {/* اسلایدر اصلی */}
                    <Swiper
                      spaceBetween={10}
                      navigation
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[Navigation, Thumbs]}
                      className="w-full h-[20rem] rounded-lg"
                    >
                      {pictures.map((picture, index) => (
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

                    {/* اسلایدر کوچک */}
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={24}
                      slidesPerView={6}
                      freeMode
                      watchSlidesProgress
                      modules={[Thumbs]}
                      dir="ltr"
                      style={{
                        overflowX: "scroll",
                        overflowY: "visible",
                        marginRight: "-64px",
                        touchAction: "auto",
                      }}
                      className=" mt-3 cursor-pointer"
                    >
                      {pictures.map((picture, index) => (
                        <SwiperSlide key={picture._id}>
                          <Image
                            width={640}
                            height={640}
                            src={picture.src}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-12 w-28 rounded-lg object-cover border-2 border-transparent"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {/* <Swiper
                    // onSlideChange={handleSlideChange}
                    slidesPerView={1}
                    spaceBetween={0}
                    grabCursor={true}
                    centeredSlides={true}
                    modules={[Navigation]}
                    className=" relative z-50 mx-auto h-[20rem] overflow-hidden"
                    >
                    {pictures.length === 0 && (
                      <SwiperSlide className=" w-full bg-primary-50">
                      <p className=" flex justify-center items-center h-full">
                      تصویری وجود ندارد
                      </p>
                      </SwiperSlide>
                      )}
                      {pictures.map((picture) => (
                        <SwiperSlide key={picture._id} className=" h-full">
                        <Image
                        src={picture.src}
                        alt="car"
                        width={1280}
                        height={1280}
                          className=" h-full object-cover object-center w-full"
                        />
                      </SwiperSlide>
                    ))}
                    
                    {pictures.length > 1 && (
                      <>
                      <NextSliderButton />
                      <PrevSliderButton />
                      </>
                      )}
                      </Swiper> */}
                  </div>
                </div>
              </DialogContent>
            </DialogOverlay>
          </DialogPortal>
        </Dialog>
      )}
    </>
  );
}

export default CarPictures;
