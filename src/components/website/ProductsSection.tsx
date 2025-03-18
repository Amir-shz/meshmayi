import { carTypes } from "@/types/types";
import CarCard from "./CarCard";
import SectionsHeader from "./SectionsHeader";
import LinkedCarCard from "./LinkedCarCard";

export default async function ProductsSection() {
  const cars = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getSixLastCars`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <section id="products">
      <SectionsHeader
        title="محصولات"
        href="/products"
        linkTitle="محصولات بیشتر"
      />
      <div className=" grid grid-cols-3 gap-8 max-lg:gap-4 max-sm:hidden">
        {cars.map((car: carTypes) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      <div className=" sm:hidden flex flex-col -mb-3">
        <div className=" grid grid-cols-3 gap-8 max-sm:gap-3 max-sm:overflow-x-scroll overflow-y-visible max-sm:flex hide-scrollbar -ml-4 pl-4 -mr-4 pr-4 pb-3">
          {cars.slice(0, 3).map((car: carTypes) => (
            <LinkedCarCard key={car._id} car={car} />
          ))}
        </div>
        <div className=" grid grid-cols-3 gap-8 max-sm:gap-3 max-sm:overflow-x-scroll overflow-y-visible max-sm:flex hide-scrollbar -ml-4 pl-4 -mr-4 pr-4 pb-3 ">
          {cars.slice(3, 7).map((car: carTypes) => (
            <LinkedCarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
