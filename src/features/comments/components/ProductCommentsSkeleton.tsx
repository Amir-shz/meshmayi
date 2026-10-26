import { MessageCircle } from "lucide-react";
import CommentListSkeleton from "./CommentListSkeleton";
import CommentFormSkeleton from "./CommentFormSkeleton";

export default function ProductCommentsSkeleton() {
  return <section className="product-comments" aria-label="در حال آماده‌سازی بخش دیدگاه‌ها" aria-busy="true"><header className="comments-heading"><div><p className="product-eyebrow">گفت‌وگو درباره انتخاب شما</p><h2>هر دیدگاه، یک مسیر تازه <MessageCircle aria-hidden="true" /></h2><p>تجربه‌ها و نگاه‌های متفاوت، به انتخاب بهتر کمک می‌کنند.</p></div><span className="comments-count skeleton-text" aria-hidden="true">۰ دیدگاه</span></header><div className="comments-layout"><CommentListSkeleton /><CommentFormSkeleton /></div></section>;
}
