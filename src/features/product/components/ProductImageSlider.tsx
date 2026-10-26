"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import type { CarDetail } from "../types/carDetail";
import "swiper/css";
import "swiper/css/a11y";

export default function ProductImageSlider({ pictures, name, initialSlide = 0, expanded = false, onSwiper, onActiveChange }: {
  pictures: CarDetail["pictures"];
  name: string;
  initialSlide?: number;
  expanded?: boolean;
  onSwiper?: (swiper: SwiperInstance) => void;
  onActiveChange?: (index: number) => void;
}) {
  const slider = useRef<SwiperInstance | null>(null);
  const [active, setActive] = useState(initialSlide);
  const [failed, setFailed] = useState<string[]>([]);
  return (
    <div className={`product-image-slider${expanded ? " is-expanded" : ""}`}>
      <div className="product-photo">
        {pictures.length ? <Swiper
          modules={[A11y]}
          a11y={{ containerMessage: `تصاویر ${name}`, itemRoleDescriptionMessage: "تصویر", slideLabelMessage: "{{index}} / {{slidesLength}}" }}
          dir="rtl"
          initialSlide={initialSlide}
          slidesPerView={1}
          loop={pictures.length > 1}
          grabCursor={pictures.length > 1}
          watchOverflow
          onSwiper={(swiper) => { slider.current = swiper; onSwiper?.(swiper); }}
          onSlideChange={(swiper) => { setActive(swiper.realIndex); onActiveChange?.(swiper.realIndex); }}
          className="product-swiper"
        >
          {pictures.map((picture, index) => <SwiperSlide key={picture._id || index}>
            {failed.includes(picture.src) ? <div className="product-photo-empty"><ImageIcon size={40} aria-hidden="true" /><p>تصویر خودرو در دسترس نیست</p></div> : <Image
              src={picture.src} alt={`${name}، تصویر ${digitsEnToFa(String(index + 1))}`} fill
              priority={!expanded && index === 0} loading={index === initialSlide ? "eager" : "lazy"}
              sizes={expanded ? "90vw" : "(max-width: 1023px) 100vw, 66vw"} unoptimized draggable={false}
              className="product-main-image" onError={() => setFailed((current) => [...current, picture.src])}
            />}
          </SwiperSlide>)}
        </Swiper> : <div className="product-photo-empty"><ImageIcon size={40} aria-hidden="true" /><p>تصویر خودرو در دسترس نیست</p></div>}
        {!expanded && <span className="product-photo-label">نگاهی نزدیک‌تر</span>}
        {pictures.length > 0 && <span className="product-photo-count" aria-live="polite" aria-atomic="true">تصویر {digitsEnToFa(String(active + 1))} از {digitsEnToFa(String(pictures.length))}</span>}
        {pictures.length > 1 && <div className="product-gallery-arrows">
          <button onClick={() => slider.current?.slidePrev()} aria-label="تصویر قبلی"><ChevronRight aria-hidden="true" /></button>
          <button onClick={() => slider.current?.slideNext()} aria-label="تصویر بعدی"><ChevronLeft aria-hidden="true" /></button>
        </div>}
      </div>
      <div className="product-thumbnails" aria-label="انتخاب تصویر">
        {pictures.map((picture, index) => <button key={picture._id || index} onClick={() => slider.current?.slideToLoop(index)} aria-label={`نمایش تصویر ${digitsEnToFa(String(index + 1))}`} aria-pressed={active === index}>
          <Image src={picture.src} alt="" fill sizes="120px" unoptimized draggable={false} />
          <span>{digitsEnToFa(String(index + 1)).padStart(2, "۰")}</span>
        </button>)}
      </div>
    </div>
  );
}
