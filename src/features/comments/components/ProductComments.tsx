import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { getProductComments } from "@/services/apiComments";
import CommentForm from "./CommentForm";
import CommentListSkeleton from "./CommentListSkeleton";
import ProductCommentList from "./ProductCommentList";
import ProductCommentCount from "./ProductCommentCount";

export default function ProductComments({ carId, page }: { carId: string; page: number }) {
  const result = getProductComments(carId, page).catch(() => undefined);
  return <section id="comments" className="product-comments" aria-labelledby="comments-heading">
    <header className="comments-heading"><div><p className="product-eyebrow">گفت‌وگو درباره انتخاب شما</p><h2 id="comments-heading">هر دیدگاه، یک مسیر تازه <MessageCircle aria-hidden="true" /></h2><p>تجربه‌ها و نگاه‌های متفاوت، به انتخاب بهتر کمک می‌کنند.</p></div><Suspense fallback={<span className="comments-count skeleton-text">۰ دیدگاه</span>}><ProductCommentCount result={result} /></Suspense></header>
    <div className="comments-layout"><Suspense key={page} fallback={<CommentListSkeleton />}><ProductCommentList result={result} carId={carId} /></Suspense><CommentForm carId={carId} /></div>
  </section>;
}
