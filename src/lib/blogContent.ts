import type { JSONContent } from "@tiptap/core";

export const BLOG_FONTS = ["inherit", "Tahoma", "Arial", "Georgia"];
export const BLOG_SIZES = ["14px", "16px", "18px", "20px", "24px", "32px"];
export const BLOG_PAGE_SIZE = 9;
export const BLOG_EMPTY_CONTENT: JSONContent = { type: "doc", content: [{ type: "paragraph" }] };
const nodes = new Set(["doc", "paragraph", "heading", "text", "bulletList", "orderedList", "listItem", "blockquote", "codeBlock", "horizontalRule", "hardBreak", "image", "table", "tableRow", "tableHeader", "tableCell"]);
const marks = new Set(["bold", "italic", "underline", "strike", "code", "link", "textStyle", "highlight"]);

export function blogSlug(text: string) {
  return text.normalize("NFKC").replace(/[يى]/g, "ی").replace(/ك/g, "ک").trim().toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/[\s-]+/g, "-").slice(0, 180).replace(/-$/, "");
}

export function safeBlogLink(value: unknown): value is string {
  if (typeof value !== "string" || /[\u0000-\u0020\u007f\\]/.test(value)) return false;
  return /^https?:\/\//i.test(value) || /^mailto:[^@]+@[^@]+$/.test(value) || /^\/(?!\/)/.test(value) || /^#[\p{L}\p{N}_-]+$/u.test(value);
}

export function safeBlogImage(value: unknown): value is string {
  // Bundled sample image is trusted like the blog's own uploaded assets.
  if (value === "/images/hero-mercedes.jpg") return true;
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.port && url.hostname === "zarsazan.storage.c2.liara.space" && url.pathname.startsWith("/blog/") && !url.username && !url.password && !url.search && !url.hash;
  } catch { return false; }
}

function color(value: unknown) { return typeof value === "string" && /^#[a-f\d]{6}$/i.test(value); }
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("ساختار محتوای مقاله نامعتبر است.");
  return value as Record<string, unknown>;
}

export function validateBlogContent(input: unknown): JSONContent {
  if (!input || JSON.stringify(input).length > 1_000_000) throw new Error("محتوای مقاله نامعتبر یا بیش از حد طولانی است.");
  let count = 0;
  function visit(value: unknown, depth: number): JSONContent {
    const node = object(value);
    if (++count > 10000 || depth > 32 || typeof node.type !== "string" || !nodes.has(node.type)) throw new Error("بلوک نامعتبر در مقاله.");
    const result: JSONContent = { type: node.type };
    const attrs = node.attrs == null ? {} : object(node.attrs);
    const clean: Record<string, unknown> = {};
    if (node.type === "text") {
      if (typeof node.text !== "string" || !node.text.length) throw new Error("متن نامعتبر است.");
      result.text = node.text;
    }
    if (node.type === "heading") {
      if (![2, 3, 4].includes(Number(attrs.level))) throw new Error("سطح تیتر نامعتبر است.");
      clean.level = Number(attrs.level);
    }
    if (["paragraph", "heading"].includes(node.type)) {
      if (attrs.textAlign != null && !["right", "left", "center", "justify"].includes(String(attrs.textAlign))) throw new Error("تراز متن نامعتبر است.");
      if (attrs.dir != null && !["rtl", "ltr", "auto"].includes(String(attrs.dir))) throw new Error("جهت متن نامعتبر است.");
      clean.textAlign = attrs.textAlign ?? "right";
      clean.dir = attrs.dir ?? "rtl";
    }
    if (node.type === "orderedList") clean.start = Math.max(1, Math.min(10000, Number(attrs.start) || 1));
    if (node.type === "image") {
      if (!safeBlogImage(attrs.src) || attrs.uploadId) throw new Error("تصویر مقاله معتبر نیست یا هنوز آپلود نشده است.");
      clean.src = attrs.src;
      clean.alt = String(attrs.alt ?? "").slice(0, 200);
      clean.caption = String(attrs.caption ?? "").slice(0, 500);
      clean.title = String(attrs.title ?? "").slice(0, 200);
      clean.width = Math.max(50, Math.min(2400, Number(attrs.width) || 800));
      clean.align = ["left", "right", "center"].includes(String(attrs.align)) ? attrs.align : "center";
    }
    if (["tableCell", "tableHeader"].includes(node.type)) {
      for (const key of ["colspan", "rowspan"]) clean[key] = Math.max(1, Math.min(20, Math.floor(Number(attrs[key]) || 1)));
      if (Array.isArray(attrs.colwidth)) clean.colwidth = attrs.colwidth.slice(0, 20).map(n => Math.max(30, Math.min(1200, Number(n) || 100)));
    }
    if (Object.keys(clean).length) result.attrs = clean;
    if (node.marks != null) {
      if (!Array.isArray(node.marks) || node.marks.length > 10) throw new Error("استایل نامعتبر است.");
      result.marks = node.marks.map(value => {
        const mark = object(value);
        if (typeof mark.type !== "string" || !marks.has(mark.type)) throw new Error("استایل پشتیبانی نمی‌شود.");
        const a = mark.attrs == null ? {} : object(mark.attrs);
        const out: Record<string, unknown> = {};
        if (mark.type === "link") {
          if (!safeBlogLink(a.href)) throw new Error("آدرس لینک معتبر نیست.");
          out.href = a.href;
        }
        if (mark.type === "textStyle") {
          if (a.fontFamily != null) { if (!BLOG_FONTS.includes(String(a.fontFamily))) throw new Error("فونت نامعتبر."); out.fontFamily = a.fontFamily; }
          if (a.fontSize != null) { if (!BLOG_SIZES.includes(String(a.fontSize))) throw new Error("اندازه متن نامعتبر."); out.fontSize = a.fontSize; }
          for (const key of ["color", "backgroundColor"]) if (a[key] != null) { if (!color(a[key])) throw new Error("رنگ نامعتبر."); out[key] = a[key]; }
        }
        if (mark.type === "highlight") { if (a.color != null && !color(a.color)) throw new Error("رنگ نامعتبر."); out.color = a.color ?? "#f5e3ac"; }
        return { type: mark.type, ...(Object.keys(out).length ? { attrs: out } : {}) };
      });
    }
    if (node.content != null) {
      if (!Array.isArray(node.content)) throw new Error("ساختار بلوک نامعتبر.");
      result.content = node.content.map(child => visit(child, depth + 1));
    }
    const blocks = ["paragraph", "heading", "bulletList", "orderedList", "blockquote", "codeBlock", "horizontalRule", "image", "table"];
    const permitted = ({ doc: blocks, paragraph: ["text", "hardBreak"], heading: ["text", "hardBreak"], codeBlock: ["text"], bulletList: ["listItem"], orderedList: ["listItem"], listItem: blocks, blockquote: blocks, table: ["tableRow"], tableRow: ["tableCell", "tableHeader"], tableCell: blocks, tableHeader: blocks } as Record<string, string[]>)[node.type] ?? [];
    if (result.content?.some(child => !permitted.includes(child.type ?? ""))) throw new Error("ترتیب بلوک‌های مقاله معتبر نیست.");
    if (["bulletList", "orderedList", "listItem", "blockquote", "table", "tableRow", "tableCell", "tableHeader"].includes(node.type) && !result.content?.length) throw new Error("بلوک مقاله نباید خالی باشد.");
    if (node.type === "listItem" && result.content?.[0]?.type !== "paragraph") throw new Error("ساختار فهرست معتبر نیست.");
    return result;
  }
  const doc = visit(input, 0);
  if (doc.type !== "doc") throw new Error("ساختار مقاله نامعتبر است.");
  return doc;
}

export function blogText(node: JSONContent): string {
  return node.type === "text" ? node.text ?? "" : (node.content ?? []).map(blogText).join(" ");
}
export function blogReadMinutes(content: JSONContent) { return Math.max(1, Math.ceil(blogText(content).trim().split(/\s+/).length / 200)); }
export function blogHeadings(content: JSONContent) {
  const result: { id: string; text: string; level: number }[] = [];
  function visit(node: JSONContent) {
    if (node.type === "heading") result.push({ id: `heading-${result.length + 1}`, text: blogText(node), level: Number(node.attrs?.level ?? 2) });
    node.content?.forEach(visit);
  }
  visit(content);
  return result;
}
