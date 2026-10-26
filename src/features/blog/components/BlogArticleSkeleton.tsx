import Skeleton from "@/components/loading/Skeleton";
import BlogCommentsSkeleton from "./BlogCommentsSkeleton";
import "@/styles/blog.css";
import "@/styles/skeleton.css";

export default function BlogArticleSkeleton() {
  return <article className="blog-article" role="status" aria-busy="true" aria-label="در حال دریافت مقاله">
    <div aria-hidden="true"><header className="blog-article-header"><div className="blog-back"><Skeleton className="blog-skeleton-read" /></div><p className="blog-eyebrow"><span className="skeleton-text">راهنمای دنیای خودرو</span></p><h1><span className="skeleton-text">یک انتخاب آگاهانه، آغاز یک مسیر تازه</span></h1><p className="blog-deck"><span className="skeleton-text">جزئیاتی برای شناخت بهتر خودروها و همراهی با شما در مسیر انتخاب خودروی بعدی.</span></p><div className="blog-article-meta"><Skeleton className="blog-skeleton-author" /><Skeleton className="blog-skeleton-date" /><Skeleton className="blog-skeleton-duration" /></div></header>
    <div className="blog-article-cover skeleton blog-skeleton-photo" />
    <div className="blog-reading-layout"><aside className="blog-toc"><Skeleton className="blog-skeleton-toc-title" />{[0, 1, 2].map(key => <Skeleton className="blog-skeleton-toc-line" key={key} />)}</aside><div className="blog-prose"><h2><span className="skeleton-text">شروع یک مسیر تازه</span></h2>{[0, 1, 2].map(key => <p key={key}><span className="skeleton-text">شناخت نیازها و توجه به جزئیات، انتخاب را آسان‌تر می‌کند. در این مقاله همراه شما هستیم تا با نگاهی دقیق‌تر تصمیم بگیرید.</span></p>)}<blockquote><p><span className="skeleton-text">هر انتخاب خوب با شناخت و یک پرسش درست شروع می‌شود.</span></p></blockquote></div></div>
    <div className="blog-rating"><div><p className="blog-eyebrow"><span className="skeleton-text">دیدگاه شما برای ما مهم است</span></p><h2><span className="skeleton-text">امتیاز شما، راهنمای ماست</span></h2></div><Skeleton className="blog-skeleton-stars" /></div></div>
    <BlogCommentsSkeleton />
  </article>;
}
