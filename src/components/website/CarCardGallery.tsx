"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CarFront, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { carTypes } from "@/types/types";

export default function CarCardGallery({ car }: { car: carTypes }) {
  const [index, setIndex] = useState(0);
  const count = car.pictures.length;
  const current = Math.min(index, Math.max(0, count - 1));
  return (
    <div
      className="vehicle-gallery"
      role="group"
      aria-label={"تصاویر " + car.name}
    >
      <Link
        href={"/products/" + car._id}
        className="vehicle-image-link"
        aria-label={"مشاهده " + car.name}
      >
        {count ? (
          <Image
            src={car.pictures[current].src}
            alt={car.name + "، تصویر " + digitsEnToFa(String(current + 1))}
            fill
            sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, (max-width: 1199px) 33vw, 25vw"
            className="vehicle-image"
          />
        ) : (
          <CarFront size={48} strokeWidth={1.2} aria-hidden="true" />
        )}
      </Link>
      {car.labels[0] && <span className="vehicle-badge">{car.labels[0]}</span>}
      {count > 1 && (
        <>
          <span className="vehicle-image-count" dir="ltr">
            <Images size={13} aria-hidden="true" />{" "}
            {digitsEnToFa(String(current + 1))} / {digitsEnToFa(String(count))}
          </span>
          <button
            className="vehicle-gallery-button vehicle-gallery-previous"
            aria-label={"تصویر قبلی " + car.name}
            onClick={() => setIndex((current - 1 + count) % count)}
          >
            <ChevronRight size={19} />
          </button>
          <button
            className="vehicle-gallery-button vehicle-gallery-next"
            aria-label={"تصویر بعدی " + car.name}
            onClick={() => setIndex((current + 1) % count)}
          >
            <ChevronLeft size={19} />
          </button>
          <div className="vehicle-gallery-progress" aria-hidden="true">
            {car.pictures.map((picture, i) => (
              <span key={picture._id} data-active={i === current} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
