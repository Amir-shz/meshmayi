"use client";

import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/thumbs";
import PicturesModal from "./PicturesModal";

function CarPictures({
  pictures,
}: {
  pictures: { src: string; _id: string }[];
}) {
  const [activePic, setActivePic] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
