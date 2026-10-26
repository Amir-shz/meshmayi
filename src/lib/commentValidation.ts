import type { CommentStatus } from "@/features/comments/types/comment";

export const COMMENT_PAGE_SIZE = 12;
export const isCommentId = (value: unknown): value is string => typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
export const isCommentStatus = (value: unknown): value is CommentStatus => value === "pending" || value === "approved" || value === "rejected";

export function commentPage(value?: string) {
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? Math.min(page, 10000) : 1;
}

export function validateComment(form: FormData) {
  const name = typeof form.get("name") === "string" ? (form.get("name") as string).trim() : "";
  const text = typeof form.get("text") === "string" ? (form.get("text") as string).trim() : "";
  const errors: { name?: string; text?: string } = {};
  if (name.length < 2 || name.length > 60) errors.name = "نام باید بین ۲ تا ۶۰ حرف باشد.";
  if (text.length < 5 || text.length > 2000) errors.text = "متن نظر باید بین ۵ تا ۲۰۰۰ حرف باشد.";
  return { name, text, errors };
}
