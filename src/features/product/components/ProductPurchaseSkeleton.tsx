import Skeleton from "@/components/loading/Skeleton";

export default function ProductPurchaseSkeleton() {
  return <aside className="product-purchase" aria-hidden="true">
    <div className="product-purchase-card">
      <p className="product-eyebrow">یک قدم تا انتخاب شما</p><h2>قیمت خودرو</h2>
      <p className="product-price"><span className="skeleton-text skeleton-price">۳۲٬۰۰۰</span><span>یورو</span></p>
      <p className="product-price-note">برای اطلاع از قیمت نهایی و شرایط خرید، با مشاوران ما در ارتباط باشید.</p>
      <div className="product-colors"><h3>رنگ‌های ارائه‌شده</h3><div><Skeleton className="skeleton-color" /><Skeleton className="skeleton-color" /></div></div>
      <Skeleton className="product-cta" /><Skeleton className="product-secondary-cta" /><Skeleton className="product-email" />
    </div>
    <div className="product-advice"><Skeleton className="skeleton-avatar" /><div><h3>با آگاهی انتخاب کنید</h3><p>از بررسی مشخصات تا روش خرید و نحوه پرداخت؛ همراه شما هستیم.</p></div></div>
    <div className="product-mobile-bar"><div><small>قیمت خودرو</small><Skeleton className="skeleton-mobile-price" /></div><Skeleton className="skeleton-mobile-action" /></div>
  </aside>;
}
