import Skeleton from "./Skeleton";

export default function CarCardSkeleton() {
  return <article className="vehicle-card" aria-hidden="true">
    <div className="vehicle-gallery skeleton" />
    <div className="vehicle-card-body">
      <div className="vehicle-card-meta"><span className="skeleton-text">مدل ۲۰۲۵</span><span className="skeleton-text">خودروی وارداتی</span></div>
      <h3><span className="skeleton-text">نام و مدل خودروی وارداتی</span></h3>
      <p className="vehicle-card-features"><span className="skeleton-text">امکانات خودرو · مشخصات خودرو</span></p>
      <div className="vehicle-card-footer"><div><span className="vehicle-price-label skeleton-text">قیمت خودرو</span><p><strong className="skeleton-text">۳۲٬۰۰۰</strong><span className="skeleton-text">یورو</span></p></div><Skeleton className="skeleton-card-action" /></div>
    </div>
  </article>;
}
