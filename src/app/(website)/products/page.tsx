import CarCard from "@/components/website/CarCard";
import { carTypes } from "@/types/types";

async function ProductsPage() {
  const cars = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/car`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <div className=" col-span-full grid grid-cols-3 gap-8">
      {cars.map((car: carTypes) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
}

export default ProductsPage;
