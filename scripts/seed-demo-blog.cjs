const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const mongoose = require("mongoose");
require("@next/env").loadEnvConfig(process.cwd());

const uri = process.env.DATABASE ?? "";
if (!/^mongodb:\/\/(?:127\.0\.0\.1|localhost|\[::1\]):27017\/meshmayi(?:\?.*)?$/.test(uri)) {
  throw new Error("Demo blog creation is restricted to the local meshmayi database on port 27017.");
}

const modules = new Map();
function load(file) {
  file = path.resolve(file);
  if (modules.has(file)) return modules.get(file);
  const exports = {}; modules.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports, process, Buffer, URL, console, require(name) {
    if (name === "server-only") return {};
    if (name.startsWith("@/")) return load(path.resolve("src", name.slice(2)) + ".ts");
    return require(name);
  } });
  return exports;
}

const text = (value, marks) => ({ type: "text", text: value, ...(marks ? { marks } : {}) });
const paragraph = (...content) => ({ type: "paragraph", content });
const heading = (level, value) => ({ type: "heading", attrs: { level }, content: [text(value)] });

async function main() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  const Post = load("src/models/blogPostModel.ts").default;
  await Post.init();
  const slug = "demo-zarsazan-car-guide";
  if (await Post.exists({ slug })) { console.log(`Demo article already exists: /blog/${slug}. Existing content was preserved.`); return; }
  const { uploadBlogImage } = load("src/services/blogImageUpload.ts");
  const { validateBlogContent, blogReadMinutes } = load("src/lib/blogContent.ts");
  const cover = process.argv.includes("--local-image") ? "/images/hero-mercedes.jpg" : await uploadBlogImage(fs.readFileSync("public/images/hero-mercedes.jpg"));
  const content = validateBlogContent({ type: "doc", content: [
    heading(2, "این مقاله برای آزمایش مجله است"),
    paragraph(text("این یک مقالهٔ نمونه است تا ظاهر صفحه، فهرست مطالب، ادیتور، تصاویر، امتیازدهی و دیدگاه‌ها را امتحان کنید. "), text("می‌توانید آن را از پنل مدیریت ویرایش یا حذف کنید.", [{ type: "bold" } ])),
    heading(2, "انتخاب خودرو را از نیازهای خود شروع کنید"),
    paragraph(text("پیش از مقایسهٔ مدل‌ها، مشخص کنید بیشتر در شهر رانندگی می‌کنید یا سفرهای طولانی دارید. فضای کابین، راحتی صندلی‌ها و دسترسی به خدمات، بخشی از تجربهٔ روزمره‌اند.")),
    { type: "bulletList", content: ["فضای کافی برای سرنشین‌ها و وسایل سفر", "راحتی رانندگی و دید مناسب در مسیرهای شهری", "بررسی خدمات و برنامهٔ نگهداری خودرو"].map(value => ({ type: "listItem", content: [paragraph(text(value))] })) },
    { type: "image", attrs: { src: cover, alt: "مرسدس بنز سفید در فضای پارکینگ", caption: "تصویر نمونه برای بررسی اندازه، متن جایگزین و کپشن در ادیتور", width: 760, align: "center" } },
    heading(3, "مقایسهٔ سادهٔ کاربردها"),
    { type: "table", content: [
      { type: "tableRow", content: ["نوع استفاده", "نکتهٔ قابل بررسی"].map(value => ({ type: "tableHeader", content: [paragraph(text(value))] })) },
      ...[["رفت‌وآمد شهری", "ابعاد خودرو، دید راننده و راحتی پارک"], ["سفر خانوادگی", "فضای کابین، صندوق و راحتی مسیر"], ["استفادهٔ روزمره", "خدمات، نگهداری و امکانات کاربردی"]].map(row => ({ type: "tableRow", content: row.map(value => ({ type: "tableCell", content: [paragraph(text(value))] })) })),
    ] },
    heading(4, "یک یادآوری کوتاه"),
    { type: "blockquote", content: [paragraph(text("بهترین انتخاب، خودرویی است که با نیازها و شیوهٔ استفادهٔ شما هماهنگ باشد."))] },
    heading(2, "استایل‌های متن را امتحان کنید"),
    paragraph(text("متن پررنگ", [{ type: "bold" }]), text("، "), text("ایتالیک", [{ type: "italic" }]), text("، "), text("زیرخط‌دار", [{ type: "underline" }]), text(" و "), text("خط‌خورده", [{ type: "strike" }]), text(" در این بخش کنار هم آمده‌اند.")),
    paragraph(text("این عبارت رنگ و اندازهٔ متفاوت دارد.", [{ type: "textStyle", attrs: { color: "#701c1c", fontSize: "20px", fontFamily: "Tahoma" } }]), text(" "), text("این بخش هایلایت شده است.", [{ type: "highlight", attrs: { color: "#f5e3ac" } }])),
    { type: "horizontalRule" },
    heading(2, "حالا نوبت شماست"),
    paragraph(text("برای بررسی لینک‌های داخل متن، "), text("صفحهٔ خودروها", [{ type: "link", attrs: { href: "/products" } }]), text(" را ببینید. سپس پایین همین مقاله یک امتیاز ستاره‌ای و یک دیدگاه ثبت کنید؛ دیدگاه پس از تأیید در پنل ادمین نمایش داده می‌شود.")),
  ] });
  const post = await Post.create({ title: "راهنمای انتخاب خودرو؛ مقالهٔ آزمایشی مجله زرسازان", slug, summary: "یک مقالهٔ نمونه برای تست طراحی مجله، استایل‌های متن، تصویر و کپشن، جدول، فهرست مطالب، امتیاز ستاره‌ای و تأیید دیدگاه‌ها.", category: "راهنمای خرید", cover, coverAlt: "مرسدس بنز سفید؛ تصویر شاخص مقالهٔ آزمایشی", content, readMinutes: blogReadMinutes(content), status: "published", publishedAt: new Date() });
  console.log(`Created one published demo article: /blog/${post.slug}`);
  console.log(`Admin edit: /dashboard/blog/${post._id}`);
}
main().catch(error => { console.error(error instanceof Error ? error.message : "Demo blog creation failed."); process.exitCode = 1; }).finally(() => mongoose.disconnect());
