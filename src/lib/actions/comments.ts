"use server";

import { revalidatePath } from "next/cache";
import { createProductComment, deleteComment, setCommentStatus } from "@/services/apiComments";
import { isCommentId, isCommentStatus, validateComment } from "@/lib/commentValidation";
import type { CommentFormState } from "@/features/comments/types/comment";

export async function submitComment(carId: string, _previous: CommentFormState, form: FormData): Promise<CommentFormState> {
  if (!isCommentId(carId)) return { message: "خودرو پیدا نشد." };
  const { name, text, errors } = validateComment(form);
  if (Object.keys(errors).length) return { errors };
  if (form.get("website")) return { message: "ارسال نظر امکان‌پذیر نیست." };
  try {
    if (!await createProductComment(carId, name, text)) return { message: "این خودرو دیگر در دسترس نیست." };
  } catch {
    return { message: "نظر ارسال نشد. لطفاً دوباره تلاش کنید." };
  }
  revalidatePath("/dashboard/comments");
  return { success: true, message: "نظر شما ثبت شد و پس از تأیید ادمین نمایش داده می‌شود." };
}

export async function moderateComment(_previous: CommentFormState, form: FormData): Promise<CommentFormState> {
  const id = form.get("id");
  const status = form.get("status");
  if (!isCommentId(id) || (status !== "delete" && !isCommentStatus(status))) return { message: "درخواست نامعتبر است." };
  // Authorization is enforced again inside the data mutation, independently of the dashboard page.
  let comment;
  try {
    comment = status === "delete" ? await deleteComment(id) : await setCommentStatus(id, status);
    if (!comment) return { message: "نظر پیدا نشد؛ صفحه را تازه کنید." };
  } catch {
    return { message: "عملیات انجام نشد. دسترسی یا اتصال را بررسی کنید." };
  }
  revalidatePath("/dashboard/comments");
  revalidatePath(`/products/${comment.car}`);
  return { success: true, message: status === "delete" ? "نظر حذف شد." : "وضعیت نظر به‌روزرسانی شد." };
}
