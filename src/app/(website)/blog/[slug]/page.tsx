import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import { getPublicBlog, listBlogPosts } from "@/services/apiBlog";
import { commentPage } from "@/lib/commentValidation";
import BlogArticleSkeleton from "@/features/blog/components/BlogArticleSkeleton";
import BlogArticle from "@/features/blog/components/BlogArticle";
import BlogCard from "@/features/blog/components/BlogCard";
import "@/styles/blog.css";
import "@/styles/comments.css";
import { siteUrl } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";
const read = cache(async (slug: string) => {
  try { return await getPublicBlog(decodeURIComponent(slug)); }
  catch (error) { if (error instanceof URIError) return null; throw error; }
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = await read((await params).slug);
  if (!post) return { title: "مقاله پیدا نشد" };
  const base = siteUrl();
  return { metadataBase: new URL(base), title: `${post.title} | مجله زرسازان`, description: post.summary, alternates: { canonical: new URL(`/blog/${encodeURIComponent(post.slug)}`, base).toString() }, openGraph: { title: post.title, description: post.summary, type: "article", publishedTime: post.publishedAt ?? undefined, images: [{ url: post.cover, alt: post.coverAlt }] } };
}

export default async function ArticlePage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ commentsPage?: string }> }) {
  const post = await read((await params).slug);
  if (!post) notFound();
  const query = await searchParams;
  const related = await listBlogPosts({ category: post.category, limit: 4 }).catch(() => null);
  return <main className="blog-page col-span-full"><Suspense fallback={<BlogArticleSkeleton />}><BlogArticle post={post} commentsPage={commentPage(query.commentsPage)} /></Suspense>{related && related.posts.some(p => p._id !== post._id) && <section className="blog-related"><div className="blog-section-heading"><h2>در ادامه بخوانید</h2></div><div className="blog-grid">{related.posts.filter(p => p._id !== post._id).slice(0, 3).map(p => <BlogCard key={p._id} post={p} />)}</div></section>}</main>;
}
