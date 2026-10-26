import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Clock3, BookOpen } from "lucide-react";
import { blogHeadings } from "@/lib/blogContent";
import BlogContent from "./BlogContent";
import BlogComments from "./BlogComments";
import BlogCommentsSkeleton from "./BlogCommentsSkeleton";
import BlogRating from "./BlogRating";
import type { BlogPost } from "../types/blog";
import { blogRatingSummary } from "@/services/apiBlogVotes";

export default async function BlogArticle({ post, preview = false, commentsPage = 1 }: { post: BlogPost; preview?: boolean; commentsPage?: number }) {
  const headings = blogHeadings(post.content);
  const summary = preview ? { average: 0, count: 0 } : await blogRatingSummary(post._id).catch(() => ({ average: 0, count: 0 }));
  return <article className="blog-article">
    {preview && <p className="blog-preview-banner">پیش‌نمایش خصوصی · فقط محتوای ذخیره‌شده نمایش داده می‌شود.</p>}
    <header className="blog-article-header"><Link href={preview ? "/dashboard/blog" : "/blog"} className="blog-back"><ArrowRight size={17} aria-hidden="true" />{preview ? "مدیریت مقاله‌ها" : "بازگشت به مجله"}</Link><p className="blog-eyebrow">{post.category || "مجله زرسازان"}</p><h1>{post.title}</h1><p className="blog-deck">{post.summary}</p><div className="blog-article-meta"><span>تحریریه زرسازان بهرو</span><time dateTime={post.publishedAt ?? post.createdAt}>{new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}</time><span><Clock3 size={16} aria-hidden="true" />{post.readMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span></div></header>
    {post.cover && <div className="blog-article-cover"><Image src={post.cover} alt={post.coverAlt} fill priority sizes="(max-width: 800px) 100vw, 1200px" /></div>}
    <div className="blog-reading-layout">{headings.length > 0 && <aside className="blog-toc"><h2><BookOpen size={18} aria-hidden="true" />در این مقاله می‌خوانید</h2><nav aria-label="فهرست مقاله">{headings.map(item => <a key={item.id} href={`#${item.id}`} data-level={item.level}>{item.text}</a>)}</nav></aside>}<BlogContent content={post.content} /></div>
    {!preview && <><BlogRating postId={post._id} initial={summary} /><Suspense fallback={<BlogCommentsSkeleton />}><BlogComments postId={post._id} slug={post.slug} page={commentsPage} /></Suspense></>}
  </article>;
}
