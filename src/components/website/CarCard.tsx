import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Slider from "../Slider";
import Button from "../Button";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { carTypes } from "@/types/types";

function CarCard({ car }: { car: carTypes }) {
  return (
    <div className=" rounded-lg bg-neutral-100 border border-neutral-300 hover:border-primary-300 hover:shadow-3 overflow-hidden max-w-[34rem] flex flex-col duration-300 max-sm:max-w-full min-w-[16.5rem]">
      <div className=" w-full relative z-10">
        <Slider pictures={car.pictures} />

        <div className=" absolute left-2 top-2 z-[1000] flex flex-wrap gap-1">
          {car.labels.map((label, index) => (
            <p
              key={index}
              className=" rounded-lg border border-primary-200 bg-primary-50 px-3 py-1 text-neutral-700 text-p3_M_desktop max-sm:text-lb2_mobile"
            >
              {label}
            </p>
          ))}
        </div>
      </div>

      <div className=" p-4 max-sm:px-2 max-sm:py-3 flex flex-col flex-grow">
        <p className=" text-neutral-800 text-p1_M_desktop max-sm:text-p1_M_mobile flex gap-1">
          <span>{digitsEnToFa(String(car.name ? car.name : ""))}</span>
          <span>{car.name && car.model && "-"}</span>
          <span>{digitsEnToFa(String(car.model ? car.model : ""))}</span>
        </p>
        <div className=" flex flex-col flex-grow">
          <div className=" flex flex-col gap-1 mt-4 mb-6 max-sm:mt-3 max-sm:mb-4">
            <p className=" text-neutral-600 text-p2_M_desktop max-sm:text-p3_M_mobile">
              امکانات
            </p>
            <div className=" flex flex-wrap gap-2 w-full max-h-[4.5rem] overflow-y-hidden">
              {car.options.slice(0, 7).map((option, index) => (
                <p
                  key={index}
                  className=" rounded-lg border border-neutral-300 bg-neutral-200 text-p3_M_desktop text-neutral-700 px-3 py-1 max-sm:px-2 max-sm:text-lb2_mobile"
                >
                  {option}
                </p>
              ))}
              {car.options.length > 7 && (
                <p className="rounded-lg border border-neutral-300 bg-neutral-200 text-p3_M_desktop text-neutral-700 px-3 py-1 max-sm:px-2 max-sm:text-lb2_mobile">
                  ...
                </p>
              )}
            </div>
          </div>
          <div className=" flex justify-between items-center mt-auto">
            <p className=" flex gap-1 items-center">
              <span className=" text-p1_M_desktop max-sm:text-p1_M_mobile text-neutral-800">
                {digitsEnToFa(addCommas(car.price))}
              </span>
              <span className=" text-neutral-500 text-p4_M_desktop max-sm:text-p4_SB_desktop">
                تومان
              </span>
            </p>
            <Link href={`/products/${car._id}`} className=" max-sm:hidden">
              <Button icon={<HiOutlineChevronLeft />} size="big" type="outline">
                بیشتر
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
