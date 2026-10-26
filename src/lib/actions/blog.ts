"use server";

import { revalidatePath } from "next/cache";
import { parseBlogForm } from "@/lib/blogValidation";
import { isCommentId, isCommentStatus, validateComment } from "@/lib/commentValidation";
import { BlogError } from "@/lib/blogErrors";
import { blogVisitor } from "@/lib/blogVisitor";
import { requireAdmin } from "@/lib/adminAuth";
import { changeBlogComment, createBlogComment, removeBlogPost, saveBlogPost } from "@/services/apiBlog";
import { blogRateLimit, readBlogVote, writeBlogVote } from "@/services/apiBlogVotes";
import type { BlogActionState } from "@/features/blog/types/blog";
import type { CommentFormState } from "@/features/comments/types/comment";

function refreshBlog(slug: string) {
  for (const path of ["/", "/blog", `/blog/${slug}`, "/dashboard/blog", "/dashboard/blog/comments", "/sitemap.xml"]) revalidatePath(path);
}

export async function saveBlog(_previous: BlogActionState, form: FormData): Promise<BlogActionState> {
  await requireAdmin();
  const rawId = form.get("id");
  const id = rawId ? String(rawId) : null;
  const version = String(form.get("version") ?? "");
  if (id && (!isCommentId(id) || !Number.isFinite(Date.parse(version)))) return { message: "شناسه یا نسخهٔ مقاله معتبر نیست." };
  let data;
  try { data = parseBlogForm(form); } catch (error) { return { message: error instanceof Error ? error.message : "محتوا معتبر نیست." }; }
  try {
    const post = await saveBlogPost(id, data, version);
    refreshBlog(post.slug);
    return { success: true, id: post._id, slug: post.slug, updatedAt: post.updatedAt, message: post.status === "published" ? "مقاله منتشر و به‌روز شد." : "پیش‌نویس ذخیره شد." };
  } catch (error) {
    return { message: error instanceof BlogError ? error.message : (error as { code?: number }).code === 11000 ? "مقاله‌ای با آدرس مشابه هم‌زمان ذخیره شد؛ دوباره ذخیره کنید." : "ذخیره انجام نشد؛ اتصال را بررسی و دوباره تلاش کنید." };
  }
}

export async function deleteBlog(_previous: BlogActionState, form: FormData): Promise<BlogActionState> {
  const id = form.get("id");
  if (!isCommentId(id)) return { message: "شناسه معتبر نیست." };
  await requireAdmin();
  try {
    const post = await removeBlogPost(id);
    if (!post) return { message: "مقاله پیدا نشد." };
    refreshBlog(post.slug);
    return { success: true, message: "مقاله حذف شد." };
  } catch { return { message: "حذف مقاله انجام نشد؛ دوباره تلاش کنید." }; }
}

export async function submitBlogComment(postId: string, _previous: CommentFormState, form: FormData): Promise<CommentFormState> {
  if (!isCommentId(postId)) return { message: "مقاله معتبر نیست." };
  const { name, text, errors } = validateComment(form);
  if (Object.keys(errors).length) return { errors };
  if (form.get("website")) return { message: "ارسال نظر امکان‌پذیر نیست." };
  try {
    await blogRateLimit(await blogVisitor(), "comment", 5);
    await createBlogComment(postId, name, text);
    revalidatePath("/dashboard/blog/comments");
    return { success: true, message: "دیدگاه شما ثبت شد و پس از تأیید ادمین منتشر می‌شود." };
  } catch (error) { return { message: error instanceof BlogError ? error.message : "ارسال انجام نشد؛ دوباره تلاش کنید." }; }
}

export async function moderateBlogComment(_previous: CommentFormState, form: FormData): Promise<CommentFormState> {
  const id = form.get("id"), status = form.get("status");
  if (!isCommentId(id) || (status !== "delete" && !isCommentStatus(status))) return { message: "درخواست معتبر نیست." };
  await requireAdmin();
  try {
    const slug = await changeBlogComment(id, status);
    if (slug) revalidatePath(`/blog/${slug}`);
    revalidatePath("/dashboard/blog/comments");
    return { success: true, message: status === "delete" ? "دیدگاه حذف شد." : "وضعیت دیدگاه تغییر کرد." };
  } catch { return { message: "عملیات انجام نشد؛ دوباره تلاش کنید." }; }
}

export async function getMyBlogRating(postId: string) {
  if (!isCommentId(postId)) return { rating: 0, message: "مقاله معتبر نیست." };
  try { return { rating: await readBlogVote(postId, await blogVisitor()) }; }
  catch { return { rating: 0, message: "دریافت امتیاز شما ممکن نشد." }; }
}

export async function rateBlog(postId: string, rating: number) {
  if (!isCommentId(postId) || !Number.isInteger(rating) || rating < 1 || rating > 5) return { message: "امتیاز باید بین ۱ تا ۵ باشد." };
  try {
    const summary = await writeBlogVote(postId, await blogVisitor(true), rating);
    return { ...summary, rating, success: true, message: "امتیاز شما ثبت شد." };
  } catch (error) { return { message: error instanceof BlogError ? error.message : "ثبت امتیاز انجام نشد؛ دوباره تلاش کنید." }; }
}
