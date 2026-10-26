import "server-only";
import sharp from "sharp";
import { S3 } from "aws-sdk";
import { randomUUID } from "node:crypto";
import { BlogError } from "@/lib/blogErrors";

export async function prepareBlogImage(bytes: Buffer) {
  if (bytes.length > 5 * 1024 * 1024 || !bytes.length) throw new BlogError("حجم تصویر باید کمتر از ۵ مگابایت باشد.");
  const image = sharp(bytes, { limitInputPixels: 40_000_000, failOn: "warning" });
  const metadata = await image.metadata();
  if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format) || (metadata.pages ?? 1) > 1) throw new BlogError("فقط تصویر ثابت JPEG، PNG یا WebP مجاز است.");
  return image.rotate().resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
}

export async function uploadBlogImage(bytes: Buffer) {
  const body = await prepareBlogImage(bytes);
  const accessKeyId = process.env.LIARA_ACCESS_KEY, secretAccessKey = process.env.LIARA_SECRET_KEY, endpoint = process.env.LIARA_ENDPOINT, bucket = process.env.LIARA_BUCKET_NAME;
  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) throw new BlogError("تنظیمات فضای ذخیره‌سازی تصاویر روی سرور کامل نیست.", 500);
  const client = new S3({ accessKeyId, secretAccessKey, endpoint, maxRetries: 1, httpOptions: { connectTimeout: 8000, timeout: 20000 } });
  const key = `blog/${randomUUID()}.webp`;
  try {
    await client.putObject({ Bucket: bucket, Key: key, Body: body, ContentType: "image/webp", ACL: "public-read", CacheControl: "public, max-age=31536000, immutable" }).promise();
  } catch (error) {
    const failure = error as { code?: string; statusCode?: number; originalError?: { code?: string } };
    const codes = [failure.code, failure.originalError?.code];
    if (codes.some(code => code && ["NetworkingError", "UnknownEndpoint", "TimeoutError", "ENOTFOUND", "EAI_AGAIN", "ECONNRESET", "ECONNREFUSED", "ETIMEDOUT"].includes(code))) throw new BlogError("ارتباط سرور با فضای ذخیره‌سازی لیارا برقرار نشد. اتصال شبکه یا VPN سرور را بررسی کنید و دوباره تلاش کنید.", 503);
    if (failure.statusCode === 403 || codes.some(code => ["AccessDenied", "InvalidAccessKeyId", "SignatureDoesNotMatch"].includes(code ?? ""))) throw new BlogError("لیارا اجازهٔ آپلود نمی‌دهد؛ کلیدهای دسترسی و مجوز باکت باید بررسی شوند.", 502);
    throw new BlogError("آپلود در فضای ذخیره‌سازی تصاویر انجام نشد؛ دوباره تلاش کنید.", 502);
  }
  return `https://zarsazan.storage.c2.liara.space/${key}`;
}
