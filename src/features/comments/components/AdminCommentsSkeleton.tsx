import Skeleton from "@/components/loading/Skeleton";

export default function AdminCommentsSkeleton() {
  return <div className="admin-comments" role="status" aria-label="در حال دریافت دیدگاه‌های کاربران" aria-busy="true">
    <header aria-hidden="true"><div><p>مدیریت گفت‌وگوهای محصولات</p><h1>دیدگاه‌های کاربران</h1></div><Skeleton className="skeleton-comment-name" /></header>
    <div className="admin-comments-tabs" aria-hidden="true">{[0, 1, 2].map(index => <Skeleton key={index} className="skeleton-admin-tab" />)}</div>
    <div className="admin-comments-list" aria-hidden="true">{[0, 1, 2].map(index => <div key={index} className="admin-comment-card"><header><div><Skeleton className="skeleton-comment-name" /><Skeleton className="skeleton-comment-date" /></div><Skeleton className="skeleton-comment-name" /></header><Skeleton className="skeleton-paragraph" /><div className="comment-moderation"><div><Skeleton className="skeleton-admin-tab" /><Skeleton className="skeleton-admin-tab" /></div></div></div>)}</div>
  </div>;
}
