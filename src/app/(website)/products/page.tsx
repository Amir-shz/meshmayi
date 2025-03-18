import CarCard from "@/components/website/CarCard";
import LinkedCarCard from "@/components/website/LinkedCarCard";
import SectionsHeader from "@/components/website/SectionsHeader";
import { carTypes } from "@/types/types";

export const revalidate = 0;

export default async function ProductsPage() {
  const cars = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/car`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <>
      <div className=" col-span-full">
        <SectionsHeader title="محصولات" />
      </div>
      <div className=" max-sm:hidden col-span-full grid grid-cols-3 max-[850px]:grid-cols-2 gap-8 max-lg:gap-4 max-sm:grid-cols-1 max-sm:gap-3 ">
        {cars.map((car: carTypes) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
      <div className=" sm:hidden col-span-full grid grid-cols-3 gap-8 max-sm:grid-cols-1 max-sm:gap-3 -mb-10">
        {cars.map((car: carTypes) => (
          <LinkedCarCard key={car._id} car={car} isBigSlider />
        ))}
      </div>
    </>
  );
}
