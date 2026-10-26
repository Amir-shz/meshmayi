import { notFound } from "next/navigation";
import { getAdminBlog } from "@/services/apiBlog";
import BlogArticle from "@/features/blog/components/BlogArticle";
import "@/styles/blog.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "پیش‌نمایش خصوصی مقاله", robots: { index: false, follow: false } };
export default async function PreviewBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const post = await getAdminBlog((await params).id);
  if (!post) notFound();
  return <div className="admin-blog-preview"><BlogArticle post={post} preview /></div>;
}
