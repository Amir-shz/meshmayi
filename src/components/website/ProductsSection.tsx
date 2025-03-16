import { carTypes } from "@/types/types";
import CarCard from "./CarCard";
import SectionsHeader from "./SectionsHeader";

async function ProductsSection() {
  const cars = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getSixLastCars`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <section>
      <SectionsHeader
        title="محصولات"
        href="/products"
        linkTitle="محصولات بیشتر"
      />
      <div className=" grid grid-cols-3 gap-8">
        {cars.map((car: carTypes) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;
