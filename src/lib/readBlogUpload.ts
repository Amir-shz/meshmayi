import { BlogError } from "@/lib/blogErrors";

export async function readBlogUpload(request: Request) {
  const maximum = 5 * 1024 * 1024 + 65536;
  const reader = request.body?.getReader();
  if (!reader) throw new BlogError("تصویر ارسال نشده است.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maximum) { await reader.cancel(); throw new BlogError("فایل بیش از حد بزرگ است."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = Buffer.concat(chunks, length);
  return new Request(request.url, { method: "POST", headers: { "content-type": request.headers.get("content-type") ?? "" }, body }).formData();
}
