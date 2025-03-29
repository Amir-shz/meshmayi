import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiX,
} from "react-icons/hi";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import IconButton from "../IconButton";
import { Swiper as swiperType } from "swiper/types";

function PicturesModal({
  pictures,
  isOpen,
  setIsOpen,
}: {
  pictures: { src: string; _id: string }[];
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | swiperType>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-neutral-50/[0.01] dialog__overlay">
          <DialogContent
            style={{ maxWidth: "1280px" }}
            className="[&>button]:hidden backdrop-blur-sm w-[50rem] overflow-x-hidden"
          >
            <DialogTitle className="hidden"></DialogTitle>
            <div className=" grid grid-cols-1 w-full">
              <div className=" flex flex-row-reverse">
                <HiX
                  className=" size-6 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className=" col-span-full rounded-xl p-6 pb-3">
                {/* main slider */}
                <Swiper
                  grabCursor={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Navigation, Thumbs]}
                  dir="ltr"
                  className="relative w-full aspect-[2/1] rounded-lg"
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
                  {pictures.length > 1 && (
                    <>
                      <NextBtn />
                      <PrevBtn />
                    </>
                  )}
                </Swiper>

                {/* mini slider */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  slidesPerView={6}
                  spaceBetween={24}
                  freeMode={true}
                  modules={[Thumbs]}
                  dir="ltr"
                  style={{
                    overflowX: "scroll",
                    overflowY: "visible",
                    marginRight: "-64px",
                    touchAction: "auto",
                  }}
                  className=" mt-3 cursor-pointer hide-scrollbar"
                >
                  {pictures.map((picture, index) => (
                    <SwiperSlide key={picture._id} className=" aspect-[2/1]">
                      <Image
                        width={640}
                        height={640}
                        src={picture.src}
                        alt={`Thumbnail ${index + 1}`}
                        className=" h-full w-28 rounded-lg object-cover border-2 border-transparent"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}

export default PicturesModal;

function NextBtn() {
  const swiper = useSwiper();
  return (
    <div className=" absolute top-1/2 -translate-y-1/2 left-3 z-30">
      <IconButton size="lg" onClick={() => swiper.slideNext()}>
        <HiOutlineChevronLeft />
      </IconButton>
    </div>
  );
}

function PrevBtn() {
  const swiper = useSwiper();
  return (
    <div className=" absolute top-1/2 -translate-y-1/2 right-3 z-30">
      <IconButton size="lg" onClick={() => swiper.slidePrev()}>
        <HiOutlineChevronRight />
      </IconButton>
    </div>
  );
}
