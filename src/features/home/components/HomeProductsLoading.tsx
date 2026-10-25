export default function HomeProductsLoading() {
  return (
    <section
      className="home-section"
      aria-label="در حال دریافت خودروها"
      aria-busy="true"
    >
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">برای مسیر پیش روی شما</p>
          <h2>خودروی بعدی شما</h2>
        </div>
      </div>
      <div className="vehicle-grid" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="h-80 rounded-xl bg-neutral-200 motion-safe:animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
