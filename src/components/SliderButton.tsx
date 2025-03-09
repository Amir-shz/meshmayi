import { useSwiper } from "swiper/react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { ReactNode } from "react";

interface sliderButtonProps {
  children: ReactNode;
  location: string;
  onChangeSlide: () => void;
}

function SliderButton({
  children,
  location,
  onChangeSlide,
}: sliderButtonProps) {
  return (
    <button
      onClick={onChangeSlide}
      className={`absolute z-10 flex size-6 items-center justify-center rounded-full bg-neutral-50 text-neutral-600 transition-all duration-300 hover:bg-neutral-200 active:bg-neutral-300  ${location}`}
    >
      {children}
    </button>
  );
}

export function NextSliderButton() {
  const swiper = useSwiper();
  return (
    <SliderButton
      location="left-0 ml-4 top-1/2 -translate-y-1/2"
      onChangeSlide={() => swiper.slideNext()}
    >
      <HiOutlineChevronLeft className="size-3" />
    </SliderButton>
  );
}

export function PrevSliderButton() {
  const swiper = useSwiper();
  return (
    <SliderButton
      location="right-0 mr-4 top-1/2 -translate-y-1/2"
      onChangeSlide={() => swiper.slidePrev()}
    >
      <HiOutlineChevronRight className="size-3" />
    </SliderButton>
  );
}
