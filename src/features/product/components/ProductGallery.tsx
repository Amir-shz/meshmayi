"use client";

import { useRef, useState } from "react";
import { Expand } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { CarDetail } from "../types/carDetail";
import ProductImageSlider from "./ProductImageSlider";

export default function ProductGallery({ pictures, name }: { pictures: CarDetail["pictures"]; name: string }) {
  const [active, setActive] = useState(0);
  const mainSlider = useRef<SwiperInstance | null>(null);
  return (
    <section aria-label={`تصاویر ${name}`} className="product-gallery">
      <ProductImageSlider pictures={pictures} name={name} onSwiper={(swiper) => { mainSlider.current = swiper; }} onActiveChange={setActive} />
      {pictures.length > 0 && <Dialog>
        <DialogTrigger asChild><button className="product-expand" aria-label="بزرگ‌نمایی تصویر خودرو"><Expand size={18} aria-hidden="true" /></button></DialogTrigger>
        <DialogContent aria-describedby={undefined} className="product-lightbox" dir="rtl">
          <DialogTitle>{name}</DialogTitle>
          <ProductImageSlider pictures={pictures} name={name} initialSlide={active} expanded onActiveChange={(index) => { setActive(index); mainSlider.current?.slideToLoop(index, 0); }} />
        </DialogContent>
      </Dialog>}
    </section>
  );
}
