import Skeleton from "@/components/loading/Skeleton";

export default function BlogCardSkeleton() {
  return <article className="blog-card" aria-hidden="true">
    <div className="blog-card-photo skeleton blog-skeleton-photo"><Skeleton className="blog-skeleton-category" /></div>
    <div className="blog-card-copy"><div className="blog-card-meta"><Skeleton className="blog-skeleton-date" /><Skeleton className="blog-skeleton-duration" /></div>
      <h2><span className="skeleton-text">راهنمای انتخاب و تجربهٔ بهتر رانندگی</span></h2>
      <p><span className="skeleton-text">از جزئیات مهم تا یک انتخاب آگاهانه؛ خواندنی‌های تازه‌ای برای مسیر پیش روی شما آماده می‌کنیم.</span></p>
      <div className="blog-read-link"><Skeleton className="blog-skeleton-read" /></div>
    </div>
  </article>;
}
