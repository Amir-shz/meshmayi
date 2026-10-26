import Link from "next/link";
import { MessagesSquare, Quote, ShieldCheck } from "lucide-react";
import type { getProductComments } from "@/services/apiComments";

export default async function ProductCommentList({ result, carId }: { result: Promise<Awaited<ReturnType<typeof getProductComments>> | undefined>; carId: string }) {
  const data = await result;
  return <div className="comments-list">
    {!data ? <div className="comments-empty" role="status"><MessagesSquare aria-hidden="true" /><h3>دیدگاه‌ها فعلاً در دسترس نیستند</h3><p>برای دریافت دیدگاه‌ها دوباره صفحه را تازه کنید.</p></div> : data.comments.length ? <>
      {data.comments.map(comment => <article className="comment-card" key={comment._id}>
        <header><span className="comment-avatar" aria-hidden="true">{Array.from(comment.name)[0]}</span><div><h3>{comment.name}</h3><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}</time></div><Quote size={23} aria-hidden="true" /></header>
        <p>{comment.text}</p><span className="comment-approved"><ShieldCheck size={15} aria-hidden="true" />تأییدشده توسط ادمین</span>
      </article>)}
      {data.pages > 1 && <nav className="comments-pagination" aria-label="صفحه‌بندی دیدگاه‌ها">{data.page > 1 && <Link href={`/products/${carId}?commentsPage=${data.page - 1}#comments`}>صفحه قبل</Link>}<span>صفحه {data.page.toLocaleString("fa-IR")} از {data.pages.toLocaleString("fa-IR")}</span>{data.page < data.pages && <Link href={`/products/${carId}?commentsPage=${data.page + 1}#comments`}>صفحه بعد</Link>}</nav>}
    </> : <div className="comments-empty"><span className="comments-empty-icon"><MessagesSquare size={32} aria-hidden="true" /></span><h3>این گفت‌وگو با شما شروع می‌شود</h3><p>هنوز دیدگاهی منتشر نشده است.<br />اولین نفری باشید که درباره این خودرو می‌نویسد.</p><a href="#comment-name">نوشتن اولین دیدگاه</a></div>}
  </div>;
}
