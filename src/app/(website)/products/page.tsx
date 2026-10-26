import CarCard from "@/components/website/CarCard";
import { getCars } from "@/services/apiCars";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const revalidate = 0;

export default async function ProductsPage() {
  const cars = await getCars();
  return (
    <section
      className="vehicle-catalog col-span-full"
      aria-labelledby="catalog-title"
    >
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">برای مسیر پیش روی شما</p>
          <h1 id="catalog-title">خودروهای زرسازان بهرو</h1>
        </div>
        <span className="section-note">انتخابی متناسب با سبک زندگی شما</span>
      </div>
      {cars.length ? (
        <div className="vehicle-grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <p className="home-products-empty">
          هنوز خودرویی برای نمایش ثبت نشده است.
        </p>
      )}
    </section>
  );
}
