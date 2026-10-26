import Link from "next/link";
import { getAdminBlogComments } from "@/services/apiBlog";
import { moderateBlogComment } from "@/lib/actions/blog";
import { commentPage, isCommentStatus } from "@/lib/commentValidation";
import CommentModeration from "@/features/comments/components/CommentModeration";
import "@/styles/comments.css";
import "@/styles/blog.css";

export const dynamic = "force-dynamic";
export default async function BlogCommentsAdmin({ searchParams }: { searchParams: Promise<{ status?: string; page?: string }> }) {
  const query = await searchParams;
  const status = isCommentStatus(query.status) ? query.status : "pending";
  const data = await getAdminBlogComments(status, commentPage(query.page));
  return <div className="admin-comments admin-blog-comments"><header><div><p>گفت‌وگوهای مجله</p><h1>دیدگاه‌های بلاگ</h1></div><span>{data.count.toLocaleString("fa-IR")} دیدگاه</span></header><nav className="admin-comments-tabs" aria-label="وضعیت دیدگاه‌های مقاله‌ها">{(["pending", "approved", "rejected"] as const).map(value => <Link key={value} href={`/dashboard/blog/comments?status=${value}`} aria-current={status === value ? "page" : undefined}>{value === "pending" ? "در انتظار تأیید" : value === "approved" ? "منتشرشده" : "ردشده"}</Link>)}</nav><div className="admin-comments-list">{!data.comments.length && <div className="comments-empty"><h2>دیدگاهی در این بخش نیست</h2><p>نظرهای تازهٔ مقاله‌ها ابتدا در انتظار تأیید قرار می‌گیرند.</p></div>}{data.comments.map(comment => <article className="admin-comment-card" key={comment._id}><header><div><h2>{comment.name}</h2><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString("fa-IR")}</time></div>{comment.post && <Link href={`/dashboard/blog/${comment.post._id}/preview#comments`}>{comment.post.title}</Link>}</header><p className="admin-comment-text">{comment.text}</p><CommentModeration id={comment._id} status={comment.status} moderationAction={moderateBlogComment} /></article>)}{data.pages > 1 && <nav className="comments-pagination" aria-label="صفحه‌بندی نظرات بلاگ">{data.page > 1 && <Link href={`/dashboard/blog/comments?status=${status}&page=${data.page - 1}`}>قبل</Link>}<span>{data.page.toLocaleString("fa-IR")} از {data.pages.toLocaleString("fa-IR")}</span>{data.page < data.pages && <Link href={`/dashboard/blog/comments?status=${status}&page=${data.page + 1}`}>بعد</Link>}</nav>}</div></div>;
}
