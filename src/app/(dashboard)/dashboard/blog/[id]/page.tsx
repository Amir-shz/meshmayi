import { notFound } from "next/navigation";
import { getAdminBlog } from "@/services/apiBlog";
import BlogPostForm from "@/features/blog/components/BlogPostForm";
import "@/styles/blog.css";


export const dynamic = "force-dynamic";
export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getAdminBlog(id);
  if (!post) notFound();
  return <BlogPostForm key={post._id} post={post} />;
}
