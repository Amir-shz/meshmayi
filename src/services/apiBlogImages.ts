export async function uploadEditorImage(file: File): Promise<string> {
  if (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("تصویر JPEG، PNG یا WebP تا ۵ مگابایت انتخاب کنید.");
  const form = new FormData();
  form.set("image", file);
  let response: Response;
  try { response = await fetch("/api/blog/images", { method: "POST", body: form }); }
  catch { throw new Error("ارتباط با سرور قطع شد؛ اتصال اینترنت را بررسی و دوباره تلاش کنید."); }
  const result = await response.json().catch(() => null);
  if (!response.ok || typeof result?.url !== "string") throw new Error(typeof result?.message === "string" ? result.message : response.status === 413 ? "تصویر باید حداکثر ۵ مگابایت باشد." : "آپلود تصویر انجام نشد؛ دوباره تلاش کنید.");
  return result.url;
}
