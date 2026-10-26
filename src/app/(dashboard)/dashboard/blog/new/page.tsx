import { requireAdmin } from "@/lib/adminAuth";
import BlogPostForm from "@/features/blog/components/BlogPostForm";
import "@/styles/blog.css";

export const dynamic = "force-dynamic";
export default async function NewBlogPage() {
  await requireAdmin();
  return <BlogPostForm />;
}
