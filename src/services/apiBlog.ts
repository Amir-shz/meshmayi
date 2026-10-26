import "server-only";
import { BlogError as Error } from "@/lib/blogErrors";
import { randomBytes } from "node:crypto";
import dbConnect from "@/lib/mongoose";
import { requireAdmin } from "@/lib/adminAuth";
import BlogPost from "@/models/blogPostModel";
import BlogComment from "@/models/blogCommentModel";
import { BLOG_PAGE_SIZE } from "@/lib/blogContent";
import { isCommentId } from "@/lib/commentValidation";
import type { BlogPost as Post, BlogPostSummary, BlogComment as Comment } from "@/features/blog/types/blog";
import type { CommentStatus } from "@/features/comments/types/comment";
import type { parseBlogForm } from "@/lib/blogValidation";

export async function listBlogPosts({ q = "", category = "", page = 1, admin = false, status = "", limit = BLOG_PAGE_SIZE } = {}) {
  if (admin) await requireAdmin();
  await dbConnect();
  const filter: Record<string, unknown> = { deletedAt: null };
  if (!admin) filter.status = "published";
  else if (["draft", "published"].includes(status)) filter.status = status;
  if (category) filter.category = category.slice(0, 60);
  if (q.trim()) filter.title = { $regex: q.trim().slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  const count = await BlogPost.countDocuments(filter);
  const pages = Math.max(1, Math.ceil(count / limit));
  page = Math.max(1, Math.min(page, pages));
  const [posts, categories] = await Promise.all([
    BlogPost.find(filter).select("-content -deletedAt").sort(admin ? { updatedAt: -1, _id: -1 } : { publishedAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    BlogPost.distinct("category", { deletedAt: null, ...(!admin ? { status: "published" } : {}) }),
  ]);
  return { posts: JSON.parse(JSON.stringify(posts)) as BlogPostSummary[], count, pages, page, categories: categories.filter(Boolean).sort() as string[] };
}

export async function getPublicBlog(slug: string): Promise<Post | null> {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, status: "published", deletedAt: null }).lean();
  return post ? JSON.parse(JSON.stringify(post)) : null;
}

export async function getAdminBlog(id: string): Promise<Post | null> {
  await requireAdmin();
  if (!isCommentId(id)) return null;
  await dbConnect();
  const post = await BlogPost.findOne({ _id: id, deletedAt: null }).lean();
  return post ? JSON.parse(JSON.stringify(post)) : null;
}

export async function saveBlogPost(id: string | null, data: ReturnType<typeof parseBlogForm>, version: string) {
  await requireAdmin();
  await dbConnect();
  await BlogPost.init();
  if (id) {
    const existing = await BlogPost.findOne({ _id: id, deletedAt: null }).lean();
    if (!existing) throw new Error("مقاله پیدا نشد.");
    if (existing.publishedAt || existing.title === data.title) data.slug = existing.slug;
    else if (data.slug !== existing.slug && await BlogPost.exists({ slug: data.slug })) data.slug += `-${randomBytes(3).toString("hex")}`;
    const saved = await BlogPost.findOneAndUpdate({ _id: id, deletedAt: null, updatedAt: new Date(version) }, {
      $set: { ...data, publishedAt: existing.publishedAt ?? (data.status === "published" ? new Date() : null) },
    }, { new: true, runValidators: true }).lean();
    if (!saved) throw new Error("این مقاله در پنجرهٔ دیگری تغییر کرده است. پیش از ذخیره، تغییراتتان را کپی و صفحه را تازه کنید.");
    return JSON.parse(JSON.stringify(saved)) as Post;
  }
  // Reserve uniqueness in the database; title-derived collisions receive a short suffix.
  if (await BlogPost.exists({ slug: data.slug })) data.slug += `-${randomBytes(3).toString("hex")}`;
  const post = await BlogPost.create({ ...data, publishedAt: data.status === "published" ? new Date() : null });
  return JSON.parse(JSON.stringify(post)) as Post;
}

export async function removeBlogPost(id: string) {
  await requireAdmin();
  await dbConnect();
  return BlogPost.findOneAndUpdate({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } }, { new: true }).select("slug").lean();
}

export async function getBlogComments(postId: string, page = 1) {
  await dbConnect();
  if (!await BlogPost.exists({ _id: postId, status: "published", deletedAt: null })) return { comments: [] as Comment[], count: 0, page: 1, pages: 1 };
  const filter = { post: postId, status: "approved" };
  const count = await BlogComment.countDocuments(filter);
  const pages = Math.max(1, Math.ceil(count / 12));
  page = Math.max(1, Math.min(page, pages));
  const comments = await BlogComment.find(filter).select("name text createdAt").sort({ createdAt: -1, _id: -1 }).skip((page - 1) * 12).limit(12).lean();
  return { comments: JSON.parse(JSON.stringify(comments)) as Comment[], count, page, pages };
}

export async function createBlogComment(postId: string, name: string, text: string) {
  await dbConnect();
  if (!await BlogPost.exists({ _id: postId, status: "published", deletedAt: null })) throw new Error("مقاله در دسترس نیست.");
  await BlogComment.create({ post: postId, name, text, status: "pending" });
}

export async function getAdminBlogComments(status: CommentStatus, page: number) {
  await requireAdmin();
  await dbConnect();
  const posts = await BlogPost.find({ deletedAt: null }).select("_id").lean();
  const filter = { status, post: { $in: posts.map(p => p._id) } };
  const count = await BlogComment.countDocuments(filter), pages = Math.max(1, Math.ceil(count / 12));
  page = Math.max(1, Math.min(page, pages));
  const comments = await BlogComment.find(filter).populate({ path: "post", model: BlogPost, select: "title slug" }).sort({ createdAt: -1, _id: -1 }).skip((page - 1) * 12).limit(12).lean();
  return { comments: JSON.parse(JSON.stringify(comments)) as Comment[], count, pages, page };
}

export async function changeBlogComment(id: string, status: CommentStatus | "delete") {
  await requireAdmin();
  await dbConnect();
  const comment = status === "delete" ? await BlogComment.findByIdAndDelete(id).lean() : await BlogComment.findByIdAndUpdate(id, { $set: { status } }, { new: true, runValidators: true }).lean();
  if (!comment) throw new Error("نظر پیدا نشد.");
  const post = await BlogPost.findById(comment.post).select("slug").lean();
  return post?.slug;
}
