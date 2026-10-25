import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, CarFront } from "lucide-react";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { carTypes } from "@/types/types";

export default function HomeCarCard({ car }: { car: carTypes }) {
  return (
    <Link href={"/products/" + car._id} className="home-car-card">
      <div className="home-car-picture">
        {car.pictures[0]?.src ? (
          <Image
            src={car.pictures[0].src}
            alt={car.name}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <CarFront size={64} aria-hidden="true" />
        )}
        {car.labels[0] && (
          <span className="home-car-label">{car.labels[0]}</span>
        )}
      </div>
      <div className="home-car-copy">
        <p className="eyebrow">مدل {digitsEnToFa(String(car.model))}</p>
        <h3>{car.name}</h3>
        <p className="car-options">{car.options.slice(0, 3).join(" · ")}</p>
        <div className="home-car-bottom">
          <span>
            {car.price > 0 ? (
              <>
                {digitsEnToFa(addCommas(car.price))} <small>تومان</small>
              </>
            ) : (
              "تماس برای قیمت"
            )}
          </span>
          <ArrowUpLeft size={22} aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
