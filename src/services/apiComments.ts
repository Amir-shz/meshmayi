import "server-only";
import dbConnect from "@/lib/mongoose";
import Comment from "@/models/commentModel";
import Car from "@/models/carModel";
import { requireCommentAdmin } from "@/lib/commentAdmin";
import { COMMENT_PAGE_SIZE } from "@/lib/commentValidation";
import type { AdminComment, CommentStatus, ProductComment } from "@/features/comments/types/comment";

export async function getProductComments(carId: string, requestedPage: number) {
  await dbConnect();
  const filter = { car: carId, status: "approved" };
  const count = await Comment.countDocuments(filter);
  const pages = Math.max(1, Math.ceil(count / COMMENT_PAGE_SIZE));
  const page = Math.min(requestedPage, pages);
  const records = await Comment.find(filter).select("name text createdAt")
    .sort({ createdAt: -1, _id: -1 }).skip((page - 1) * COMMENT_PAGE_SIZE).limit(COMMENT_PAGE_SIZE).lean();
  return { comments: JSON.parse(JSON.stringify(records)) as ProductComment[], count, page, pages };
}

export async function createProductComment(carId: string, name: string, text: string) {
  await dbConnect();
  if (!await Car.exists({ _id: carId })) return false;
  await Comment.create({ car: carId, name, text, status: "pending" });
  return true;
}

export async function getAdminComments(status: CommentStatus, requestedPage: number) {
  await requireCommentAdmin();
  await dbConnect();
  const count = await Comment.countDocuments({ status });
  const pages = Math.max(1, Math.ceil(count / COMMENT_PAGE_SIZE));
  const page = Math.min(requestedPage, pages);
  const records = await Comment.find({ status }).populate({ path: "car", select: "name", model: Car })
    .sort({ createdAt: -1, _id: -1 }).skip((page - 1) * COMMENT_PAGE_SIZE).limit(COMMENT_PAGE_SIZE).lean();
  return { comments: JSON.parse(JSON.stringify(records)) as AdminComment[], count, page, pages };
}

export async function setCommentStatus(id: string, status: CommentStatus) {
  await requireCommentAdmin();
  await dbConnect();
  return Comment.findByIdAndUpdate(id, { $set: { status } }, { new: true, runValidators: true }).select("car").lean();
}

export async function deleteComment(id: string) {
  await requireCommentAdmin();
  await dbConnect();
  return Comment.findByIdAndDelete(id).select("car").lean();
}
