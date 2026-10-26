import { requireAdmin } from "@/lib/adminAuth";
import BlogPostForm from "@/features/blog/components/BlogPostForm";
import "@/styles/blog.css";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const dynamic = "force-dynamic";
export default async function NewBlogPage() {
  await requireAdmin();
  return <BlogPostForm />;
}
