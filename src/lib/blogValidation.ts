import { blogReadMinutes, blogSlug, blogText, safeBlogImage, validateBlogContent } from "@/lib/blogContent";

export function parseBlogForm(form: FormData) {
  const field = (key: string) => typeof form.get(key) === "string" ? String(form.get(key)).trim() : "";
  const title = field("title"), summary = field("summary"), cover = field("cover"), coverAlt = field("coverAlt"), category = field("category");
  const slug = blogSlug(title);
  const status = field("status");
  if (title.length < 3 || title.length > 180 || !slug) throw new Error("عنوان باید بین ۳ تا ۱۸۰ حرف باشد و آدرس معتبر داشته باشد.");
  if (summary.length > 500 || category.length > 60 || coverAlt.length > 200) throw new Error("خلاصه، دسته‌بندی یا متن جایگزین بیش از حد طولانی است.");
  if (status !== "draft" && status !== "published") throw new Error("وضعیت مقاله معتبر نیست.");
  const raw = field("content");
  if (raw.length > 1_000_000) throw new Error("محتوا بیش از حد طولانی است.");
  let input;
  try { input = JSON.parse(raw); } catch { throw new Error("محتوای مقاله قابل خواندن نیست."); }
  const content = validateBlogContent(input);
  if (cover && !safeBlogImage(cover)) throw new Error("تصویر شاخص باید از بخش آپلود تصویر انتخاب شود.");
  if (status === "published" && (!summary || !cover || !coverAlt || blogText(content).trim().length < 20)) throw new Error("برای انتشار، خلاصه، تصویر شاخص، متن جایگزین و حداقل ۲۰ حرف محتوا لازم است.");
  return { title, slug, summary, category, cover, coverAlt, content, status: status as "draft" | "published", readMinutes: blogReadMinutes(content) };
}
