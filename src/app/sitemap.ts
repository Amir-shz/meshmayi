import type { MetadataRoute } from "next";
import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/blogPostModel";
import { siteUrl } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  await dbConnect();
  const posts = await BlogPost.find({ status: "published", deletedAt: null }).select("slug updatedAt").lean();
  return [{ url: base }, { url: `${base}/blog` }, ...posts.map(post => ({ url: `${base}/blog/${encodeURIComponent(post.slug)}`, lastModified: post.updatedAt }))];
}
