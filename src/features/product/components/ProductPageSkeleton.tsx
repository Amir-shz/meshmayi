import Skeleton from "@/components/loading/Skeleton";
import ProductPurchaseSkeleton from "./ProductPurchaseSkeleton";
import ProductCommentsSkeleton from "@/features/comments/components/ProductCommentsSkeleton";
import "@/styles/product.css";
import "@/styles/comments.css";

export default function ProductPageSkeleton() {
  return <main className="product-page col-span-full" role="status" aria-label="در حال دریافت اطلاعات خودرو" aria-busy="true">
    <div aria-hidden="true">
      <div className="product-breadcrumb"><span className="skeleton-text">خانه / خودروها / نام خودرو</span></div>
      <header className="product-heading"><div className="skeleton-product-heading"><p className="product-eyebrow">انتخابی برای مسیر پیش رو</p><h1 className="skeleton-product-title"><span className="skeleton-text">نام و مدل خودروی انتخابی</span></h1><div className="product-meta"><span className="skeleton-text">مدل ۲۰۲۵</span><span className="skeleton-text">خودروی وارداتی</span></div></div><span className="product-back skeleton-text">همه خودروها ←</span></header>
    </div>
    <div className="product-layout">
      <div className="product-content" aria-hidden="true">
        <div className="product-gallery"><div className="product-photo skeleton" /><div className="product-thumbnails">{[0, 1, 2, 3].map(index => <div key={index} className="skeleton skeleton-product-thumb" />)}</div></div>
        <div className="product-details"><div className="product-section-nav"><span>مشخصات فنی</span><span>امکانات و آپشن‌ها</span><span>درباره خودرو</span></div>
          <div className="product-section"><div className="product-section-title"><Skeleton className="skeleton-icon" /><h2>جزئیاتی که تفاوت می‌سازند</h2></div><p className="product-section-caption"><span className="skeleton-text">مشخصات فنی خودرو</span></p><div className="product-specs">{[0, 1, 2, 3, 4, 5].map(index => <div key={index}><Skeleton className="skeleton-spec-label" /><Skeleton className="skeleton-spec-value" /></div>)}</div></div>
          <div className="product-section"><div className="product-section-title"><Skeleton className="skeleton-icon" /><h2>امکانات و آپشن‌ها</h2></div><p className="product-section-caption">برای تجربه‌ای راحت‌تر در هر مسیر</p><div className="product-options">{[0, 1, 2, 3].map(index => <Skeleton key={index} className="skeleton-option" />)}</div></div>
          <div className="product-section"><div className="product-section-title"><Skeleton className="skeleton-icon" /><h2>بیشتر با این خودرو آشنا شوید</h2></div><Skeleton className="skeleton-paragraph" /></div>
        </div>
      </div>
      <ProductPurchaseSkeleton />
    </div>
    <ProductCommentsSkeleton />
  </main>;
}
