import Link from "next/link";
import { MessageCircle, Quote } from "lucide-react";
import { getBlogComments } from "@/services/apiBlog";
import { submitBlogComment } from "@/lib/actions/blog";
import CommentForm from "@/features/comments/components/CommentForm";

export default async function BlogComments({ postId, slug, page }: { postId: string; slug: string; page: number }) {
  const data = await getBlogComments(postId, page).catch(() => null);
  return <section id="comments" className="product-comments blog-comments" aria-labelledby="blog-comments-heading"><header className="comments-heading"><div><p className="blog-eyebrow">گفت‌وگو ادامه دارد</p><h2 id="blog-comments-heading">نگاه شما به این مطلب <MessageCircle aria-hidden="true" /></h2><p>سؤال یا تجربه‌تان را با ما و دیگر خوانندگان در میان بگذارید.</p></div>{data && <span className="comments-count">{data.count.toLocaleString("fa-IR")} دیدگاه</span>}</header>
    <div className="comments-layout"><div className="comments-list">{!data ? <p role="status">دیدگاه‌ها فعلاً در دسترس نیستند؛ دوباره تلاش کنید.</p> : data.comments.length ? data.comments.map(comment => <article className="comment-card" key={comment._id}><header><span className="comment-avatar" aria-hidden="true">{Array.from(comment.name)[0]}</span><div><h3>{comment.name}</h3><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString("fa-IR")}</time></div><Quote aria-hidden="true" /></header><p>{comment.text}</p><span className="comment-approved">دیدگاه تأییدشده</span></article>) : <div className="comments-empty"><MessageCircle size={36} aria-hidden="true" /><h3>اولین دیدگاه از شما</h3><p>تجربه یا پرسشتان می‌تواند شروع یک گفت‌وگوی خوب باشد.</p><a href="#comment-name">نوشتن دیدگاه</a></div>}
    {data && data.pages > 1 && <nav className="comments-pagination" aria-label="صفحه‌بندی دیدگاه‌ها">{data.page > 1 && <Link href={`/blog/${slug}?commentsPage=${data.page - 1}#comments`}>قبل</Link>}<span>{data.page.toLocaleString("fa-IR")} از {data.pages.toLocaleString("fa-IR")}</span>{data.page < data.pages && <Link href={`/blog/${slug}?commentsPage=${data.page + 1}#comments`}>بعد</Link>}</nav>}</div>
    <CommentForm carId={postId} subject="مقاله" submitAction={submitBlogComment.bind(null, postId)} /></div></section>;
}
