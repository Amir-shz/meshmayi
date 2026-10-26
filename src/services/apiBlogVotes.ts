import "server-only";
import { BlogError as Error } from "@/lib/blogErrors";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/blogPostModel";
import BlogVote from "@/models/blogVoteModel";
import BlogRateLimit from "@/models/blogRateLimitModel";

export async function blogRateLimit(voter: string, operation: string, maximum = 10) {
  await dbConnect();
  await BlogRateLimit.init();
  const minute = Math.floor(Date.now() / 60000);
  const filter = { key: `${operation}:${voter}:${minute}` };
  let entry;
  try {
    entry = await BlogRateLimit.findOneAndUpdate(filter, { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((minute + 2) * 60000) } }, { upsert: true, new: true }).lean();
  } catch (error) {
    if ((error as { code?: number }).code !== 11000) throw error;
    entry = await BlogRateLimit.findOneAndUpdate(filter, { $inc: { count: 1 } }, { new: true }).lean();
  }
  if (!entry || entry.count > maximum) throw new Error("تعداد درخواست‌ها زیاد است؛ یک دقیقه دیگر تلاش کنید.");
}

export async function blogRatingSummary(postId: string) {
  await dbConnect();
  const [result] = await BlogVote.aggregate<{ average: number; count: number }>([
    { $match: { post: new mongoose.Types.ObjectId(postId) } },
    { $group: { _id: null, average: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  return { average: result?.average ?? 0, count: result?.count ?? 0 };
}

export async function readBlogVote(postId: string, voter: string) {
  await dbConnect();
  if (!await BlogPost.exists({ _id: postId, status: "published", deletedAt: null })) throw new Error("مقاله در دسترس نیست.");
  const vote = await BlogVote.findOne({ post: postId, voter }).select("rating").lean();
  return vote?.rating ?? 0;
}

export async function writeBlogVote(postId: string, voter: string, rating: number) {
  await dbConnect();
  await BlogVote.init();
  await readBlogVote(postId, voter);
  await blogRateLimit(voter, "vote");
  const filter = { post: postId, voter };
  try {
    await BlogVote.updateOne(filter, { $set: { rating } }, { upsert: true, runValidators: true });
  } catch (error) {
    if ((error as { code?: number }).code !== 11000) throw error;
    await BlogVote.updateOne(filter, { $set: { rating } }, { runValidators: true });
  }
  return blogRatingSummary(postId);
}
