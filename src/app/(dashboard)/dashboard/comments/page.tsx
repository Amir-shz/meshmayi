import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { getAdminComments } from "@/services/apiComments";
import { commentPage, isCommentStatus } from "@/lib/commentValidation";
import CommentModeration from "@/features/comments/components/CommentModeration";
import "@/styles/comments.css";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const dynamic = "force-dynamic";

export default async function CommentsPage({ searchParams }: { searchParams: Promise<{ status?: string; page?: string }> }) {
  const query = await searchParams;
  const status = isCommentStatus(query.status) ? query.status : "pending";
  const { comments, count, page, pages } = await getAdminComments(status, commentPage(query.page));
  return <div className="admin-comments" dir="rtl">
    <header><div><p>مدیریت گفت‌وگوهای محصولات</p><h1><MessageSquareText aria-hidden="true" />دیدگاه‌های کاربران</h1></div><span>{count.toLocaleString("fa-IR")} دیدگاه در این بخش</span></header>
    <nav className="admin-comments-tabs" aria-label="وضعیت دیدگاه‌ها">{(["pending", "approved", "rejected"] as const).map(value => <Link key={value} href={`/dashboard/comments?status=${value}`} aria-current={status === value ? "page" : undefined}>{value === "pending" ? "در انتظار تأیید" : value === "approved" ? "منتشرشده" : "ردشده"}</Link>)}</nav>
    <div className="admin-comments-list">
      {!comments.length && <div className="comments-empty"><MessageSquareText size={32} aria-hidden="true" /><h2>دیدگاهی در این بخش وجود ندارد</h2><p>دیدگاه‌های جدید محصولات در بخش «در انتظار تأیید» قرار می‌گیرند.</p></div>}
      {comments.map(comment => <article key={comment._id} className="admin-comment-card">
        <header><div><h2>{comment.name}</h2><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}</time></div>{comment.car ? <Link href={`/products/${comment.car._id}#comments`}>{comment.car.name} ↗</Link> : <span>محصول حذف شده</span>}</header>
        <p className="admin-comment-text">{comment.text}</p>
        <CommentModeration id={comment._id} status={comment.status} />
      </article>)}
      {pages > 1 && <nav className="comments-pagination" aria-label="صفحه‌بندی مدیریت نظرات">{page > 1 && <Link href={`/dashboard/comments?status=${status}&page=${page - 1}`}>صفحه قبل</Link>}<span>صفحه {page.toLocaleString("fa-IR")} از {pages.toLocaleString("fa-IR")}</span>{page < pages && <Link href={`/dashboard/comments?status=${status}&page=${page + 1}`}>صفحه بعد</Link>}</nav>}
    </div>
  </div>;
}
