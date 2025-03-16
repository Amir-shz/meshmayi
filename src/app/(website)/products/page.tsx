import CarCard from "@/components/website/CarCard";
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
      <div className=" col-span-full grid grid-cols-3 gap-8 max-sm:grid-cols-1 max-sm:gap-3 ">
        {cars.map((car: carTypes) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </>
  );
}
