import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Slider from "../Slider";
import Button from "../Button";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";

interface carTypes {
  _id?: string;
  name: string;
  price: number;
  model: number;
  colors: string[];
  labels: string[];
  pictures: { _id: string; src: string }[];
  descriptions: string[];
  options: string[];
  technicalSpecifications: {
    label: string;
    description: string;
  };
}

function CarCard({ car }: { car: carTypes }) {
  return (
    <div className=" rounded-lg bg-neutral-100 border border-neutral-300 hover:border-primary-300 hover:shadow-3 overflow-hidden max-w-[34rem] flex flex-col duration-300">
      <div className=" w-full h-[13.6875rem] relative z-10">
        <Slider pictures={car.pictures} />

        <div className=" absolute left-2 top-2 z-[1000] flex flex-wrap gap-1">
          {car.labels.map((label, index) => (
            <p
              key={index}
              className=" rounded-lg border border-primary-200 bg-primary-50 px-3 py-1 text-neutral-700 text-p3_M_desktop"
            >
              {label}
            </p>
          ))}
        </div>
      </div>
      <div className=" p-4 flex flex-col flex-grow">
        <p className=" text-neutral-800 text-p1_M_desktop flex gap-1">
          <span>{digitsEnToFa(String(car.name ? car.name : ""))}</span>
          <span>{car.name && car.model && "-"}</span>
          <span>{digitsEnToFa(String(car.model ? car.model : ""))}</span>
        </p>
        <div className=" flex flex-col flex-grow">
          <div className=" flex flex-col gap-1 mt-4 mb-6">
            <p className=" text-neutral-600 text-p2_M_desktop">امکانات</p>
            <div className=" flex flex-wrap gap-2 w-full">
              {car.options.map((option, index) => (
                <p
                  key={index}
                  className=" rounded-lg border border-neutral-300 bg-neutral-200 text-p3_M_desktop text-neutral-700 px-3 py-1"
                >
                  {option}
                </p>
              ))}
            </div>
          </div>
          <div className=" flex justify-between items-center mt-auto">
            <p className=" flex gap-1 items-center">
              <span className=" text-p1_M_desktop  text-neutral-800">
                {digitsEnToFa(addCommas(car.price))}
              </span>
              <span className=" text-neutral-500 text-p4_M_desktop">تومان</span>
            </p>
            <Link href={`/products/${car._id}`}>
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
