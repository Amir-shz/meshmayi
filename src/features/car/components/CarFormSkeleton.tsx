import Skeleton from "@/components/loading/Skeleton";

export default function CarFormSkeleton({ title = "ویرایش محصول" }: { title?: string }) {
  return <div className="col-span-full items-start h-full rounded-2xl bg-neutral-100 border border-neutral-300" role="status" aria-label="در حال آماده‌سازی فرم محصول" aria-busy="true">
    <div className="border-b border-neutral-300 p-8 flex justify-between items-center" aria-hidden="true"><p className="text-h4_B_desktop text-neutral-700 leading-8">{title}</p><Skeleton className="skeleton-admin-button" /></div>
    <div className="grid grid-cols-7 gap-8 px-8 overflow-y-scroll max-h-full pt-8 pb-28 hide-scrollbar" aria-hidden="true">
      <div className="col-span-3"><Skeleton className="skeleton-form-photo" /><div className="flex gap-4 mt-6"><Skeleton className="skeleton-form-action" /><Skeleton className="skeleton-form-action" /></div><div className="my-6 flex gap-3"><Skeleton className="skeleton-admin-tab" /><Skeleton className="skeleton-admin-tab" /></div><p className="text-p2_SB_desktop mb-2">توضیحات</p><Skeleton className="skeleton-form-textarea" /></div>
      <div className="items-start col-span-4 grid grid-cols-2 gap-x-5 gap-y-8 content-start">{["نام ماشین", "قیمت(یورو)", "مدل(سال)", "رنگ ها", "مشخصات فنی", "آپشن ها"].map((label, index) => <div key={label}><p className={`${index > 3 ? "text-p2_SB_desktop" : "text-p3_M_desktop"} mb-2`}>{label}</p><Skeleton className={index > 3 ? "skeleton-form-textarea" : "skeleton-field"} />{index < 3 && <p className="text-p4_R_desktop invisible mt-1">متن پیشفرض</p>}</div>)}</div>
    </div>
  </div>;
}
