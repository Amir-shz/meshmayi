import CarGridSkeleton from "./CarGridSkeleton";

export default function CatalogSkeleton() {
  return <section className="vehicle-catalog col-span-full" role="status" aria-label="در حال دریافت فهرست خودروها" aria-busy="true">
    <div className="home-section-heading"><div><p className="eyebrow">برای مسیر پیش روی شما</p><h1>خودروهای زرسازان بهرو</h1></div><span className="section-note">انتخابی متناسب با سبک زندگی شما</span></div>
    <CarGridSkeleton count={8} />
  </section>;
}
