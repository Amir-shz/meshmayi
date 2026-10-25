import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { carTypes } from "@/types/types";
import CarCardGallery from "./CarCardGallery";

export default function CarCard({ car }: { car: carTypes }) {
  return (
    <article className="vehicle-card">
      <CarCardGallery car={car} />
      <div className="vehicle-card-body">
        <div className="vehicle-card-meta">
          <span>مدل {digitsEnToFa(String(car.model))}</span>
          <span>{car.labels[1] ?? "خودروی وارداتی"}</span>
        </div>
        <h3>
          <Link href={"/products/" + car._id}>{car.name}</Link>
        </h3>
        <p className="vehicle-card-features">
          {car.options.slice(0, 2).join(" · ") ||
            "برای اطلاعات بیشتر با ما تماس بگیرید"}
        </p>
        <div className="vehicle-card-footer">
          <div>
            <span className="vehicle-price-label">قیمت خودرو</span>
            <p>
              {car.price > 0 ? (
                <>
                  <strong>{digitsEnToFa(addCommas(car.price))}</strong>
                  <span>یورو</span>
                </>
              ) : (
                <strong>تماس برای قیمت</strong>
              )}
            </p>
          </div>
          <Link
            href={"/products/" + car._id}
            className="vehicle-details"
            aria-label={"جزئیات " + car.name}
          >
            <ArrowUpLeft size={21} />
          </Link>
        </div>
      </div>
    </article>
  );
}
