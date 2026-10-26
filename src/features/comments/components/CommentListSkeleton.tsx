import Skeleton from "@/components/loading/Skeleton";

export default function CommentListSkeleton() {
  return <div className="comments-list" role="status" aria-label="در حال دریافت دیدگاه‌ها" aria-busy="true"><div className="comment-card skeleton-comment-card" aria-hidden="true"><header><Skeleton className="skeleton-avatar" /><div><Skeleton className="skeleton-comment-name" /><Skeleton className="skeleton-comment-date" /></div></header><Skeleton className="skeleton-paragraph" /><Skeleton className="skeleton-paragraph" /><Skeleton className="skeleton-comment-approved" /></div></div>;
}
