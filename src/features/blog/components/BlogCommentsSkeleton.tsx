import Skeleton from "@/components/loading/Skeleton";
import CommentListSkeleton from "@/features/comments/components/CommentListSkeleton";
import CommentFormSkeleton from "@/features/comments/components/CommentFormSkeleton";
import "@/styles/comments.css";
import "@/styles/skeleton.css";

export default function BlogCommentsSkeleton() {
  return <section className="product-comments blog-comments" role="status" aria-busy="true" aria-label="در حال دریافت دیدگاه‌های مقاله"><header className="comments-heading"><div><p className="blog-eyebrow">گفت‌وگو ادامه دارد</p><h2>نگاه شما به این مطلب</h2><p>سؤال یا تجربه‌تان را با ما و دیگر خوانندگان در میان بگذارید.</p></div><Skeleton className="blog-skeleton-count" /></header><div className="comments-layout"><CommentListSkeleton /><CommentFormSkeleton subject="مقاله" /></div></section>;
}
