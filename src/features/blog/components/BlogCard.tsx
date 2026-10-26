import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Clock3 } from "lucide-react";
import type { BlogPostSummary } from "../types/blog";

export default function BlogCard({ post, priority = false }: { post: BlogPostSummary; priority?: boolean }) {
  return <article className="blog-card">
    <Link href={`/blog/${post.slug}`} className="blog-card-photo" tabIndex={-1} aria-hidden="true">{post.cover && <Image src={post.cover} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" priority={priority} />}<span>{post.category || "مجله زرسازان"}</span></Link>
    <div className="blog-card-copy"><div className="blog-card-meta"><time dateTime={post.publishedAt ?? post.createdAt}>{new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}</time><span><Clock3 size={14} aria-hidden="true" />{post.readMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span></div>
      <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.summary}</p><Link className="blog-read-link" href={`/blog/${post.slug}`}>خواندن مقاله <ArrowUpLeft size={19} aria-hidden="true" /><span className="sr-only">: {post.title}</span></Link>
    </div>
  </article>;
}
