import Button from "@/components/Button";
import DashboardCarCard from "@/components/DashboardCarCard";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";

export const revalidate = 0;

interface carTypes {
  _id: string;
  name: string;
  price: number;
  model: number;
  colors: Record<string, string>;
  pictures: { _id: string; src: string }[];
  descriptions: Record<string, string>;
  options: string[];
  technicalSpecifications: {
    label: string;
    description: string;
  }[];
}

async function DashboardPage() {
  const cars = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/car`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <div className="col-span-full items-start h-full rounded-2xl bg-neutral-100 border border-neutral-300 ">
      <div className=" border-b border-neutral-300 col-span-full p-8 flex justify-between items-center">
        <p className=" text-h4_B_desktop text-neutral-700 leading-8">محصولات</p>
        <Link href="/dashboard/cars/new">
          <Button size="big" type="filled" icon={<HiPlus />}>
            افزودن محصول
          </Button>
        </Link>
      </div>
      <div className=" grid grid-cols-6 gap-8 px-8 overflow-y-scroll max-h-full pt-8 pb-28 hide-scrollbar">
        {cars.map((car: carTypes) => (
          <DashboardCarCard
            key={car._id}
            id={car._id}
            name={car.name}
            model={car.model}
            price={car.price}
            pictures={car.pictures}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
