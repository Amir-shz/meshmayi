import Link from "next/link";
import { ArrowLeft, CarFront } from "lucide-react";
import { getHomeCars } from "@/services/apiCars";
import HomeCarCard from "./HomeCarCard";

export default async function ProductsSection() {
  let cars: Awaited<ReturnType<typeof getHomeCars>> = [];
  let failed = false;
  try {
    cars = await getHomeCars();
  } catch (error) {
    failed = true;
    console.error("Homepage cars unavailable", error);
  }
  return (
    <section id="products" className="home-section">
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">برای مسیر پیش روی شما</p>
          <h2>خودروی بعدی شما</h2>
        </div>
        <Link className="text-link" href="/products">
          همه خودروها <ArrowLeft size={18} />
        </Link>
      </div>
      {cars.length ? (
        <div className="home-cars-grid">
          {cars.map((car) => (
            <HomeCarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="home-products-empty">
          <CarFront size={42} strokeWidth={1.2} aria-hidden="true" />
          <div>
            <h3>
              {failed
                ? "نمایش خودروها موقتاً در دسترس نیست"
                : "منتظر انتخاب‌های تازه باشید"}
            </h3>
            <p>
              {failed
                ? "لطفاً کمی بعد دوباره تلاش کنید یا با مشاوران ما تماس بگیرید."
                : "برای آشنایی با خودروها و شرایط واردات، با مشاوران ما در ارتباط باشید."}
            </p>
          </div>
          <a href="#contact-us" className="text-link">
            گفت‌وگو با مشاور <ArrowLeft size={18} />
          </a>
        </div>
      )}
    </section>
  );
}
