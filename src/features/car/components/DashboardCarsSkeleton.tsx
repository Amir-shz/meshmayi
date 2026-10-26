import Skeleton from "@/components/loading/Skeleton";

export default function DashboardCarsSkeleton() {
  return <div className="col-span-full items-start h-full rounded-2xl bg-neutral-100 border border-neutral-300" role="status" aria-label="در حال دریافت محصولات مدیریت" aria-busy="true">
    <div className="border-b border-neutral-300 p-8 flex justify-between items-center" aria-hidden="true"><p className="text-h4_B_desktop text-neutral-700 leading-8">محصولات</p><Skeleton className="skeleton-admin-button" /></div>
    <div className="grid grid-cols-6 gap-8 px-8 overflow-y-scroll max-h-full pt-8 pb-28 hide-scrollbar" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map(index => <div key={index} className="w-full col-span-2 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100"><Skeleton className="skeleton-dashboard-photo" /><div className="m-3"><p className="text-p2_SB_desktop"><span className="skeleton-text">نام خودروی وارداتی</span></p><p className="text-p3_M_desktop mt-2"><span className="skeleton-text">سال ۲۰۲۵</span></p><p className="text-p2_M_desktop mt-3"><span className="skeleton-text">۳۲٬۰۰۰ یورو</span></p><div className="flex gap-4 mt-4 justify-end"><Skeleton className="skeleton-dashboard-action" /><Skeleton className="skeleton-dashboard-action" /></div></div></div>)}</div>
  </div>;
}

