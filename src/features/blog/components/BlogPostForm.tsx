"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, ImagePlus, Save, Send } from "lucide-react";
import type { JSONContent } from "@tiptap/core";
import { BLOG_EMPTY_CONTENT, blogSlug } from "@/lib/blogContent";
import { saveBlog } from "@/lib/actions/blog";
import { uploadEditorImage } from "@/services/apiBlogImages";
import type { BlogActionState, BlogPost } from "../types/blog";

const Editor = dynamic(() => import("./BlogEditor"), { ssr: false, loading: () => <p className="blog-loading" role="status">در حال آماده‌سازی ادیتور…</p> });

export default function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? ""), [summary, setSummary] = useState(post?.summary ?? ""), [slug, setSlug] = useState(post?.slug ?? "");
  const [cover, setCover] = useState(post?.cover ?? ""), [coverAlt, setCoverAlt] = useState(post?.coverAlt ?? ""), [category, setCategory] = useState(post?.category ?? "");
  const [content, setContent] = useState<JSONContent>(post?.content ?? BLOG_EMPTY_CONTENT);
  const [id, setId] = useState(post?._id ?? ""), [version, setVersion] = useState(post?.updatedAt ?? "");
  const [everPublished, setEverPublished] = useState(!!post?.publishedAt), [status, setStatus] = useState(post?.status ?? "draft");
  const [editorBusy, setEditorBusy] = useState(false), [coverBusy, setCoverBusy] = useState(false), [uploadError, setUploadError] = useState("");
  const [dirty, setDirty] = useState(false);
  const coverInput = useRef<HTMLInputElement>(null);
  const onContent = useCallback((value: JSONContent) => { setContent(value); setDirty(true); }, []);
  const onBusy = useCallback((value: boolean) => setEditorBusy(value), []);
  const [state, action, pending] = useActionState<BlogActionState, FormData>(async (previous, form) => {
    const result = await saveBlog(previous, form);
    if (result.success && result.id && result.updatedAt) {
      setDirty(false); setId(result.id); setVersion(result.updatedAt); setSlug(result.slug ?? slug);
      const nextStatus = form.get("status") === "published" ? "published" : "draft";
      setStatus(nextStatus); if (nextStatus === "published") setEverPublished(true);
      if (!id) router.replace(`/dashboard/blog/${result.id}`);
    }
    return result;
  }, {});
  useEffect(() => {
    if (!dirty && !editorBusy && !coverBusy) return;
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    const linkClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement)?.closest("a[href]");
      if (link && !window.confirm("تغییرات ذخیره نشده‌اند. از این صفحه خارج می‌شوید؟")) { event.preventDefault(); event.stopPropagation(); }
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", linkClick, true);
    return () => { window.removeEventListener("beforeunload", beforeUnload); document.removeEventListener("click", linkClick, true); };
  }, [dirty, editorBusy, coverBusy]);
  const busy = pending || editorBusy || coverBusy;
  function submit(nextStatus: "draft" | "published", form: FormData) {
    if (busy) return;
    form.set("status", nextStatus);
    action(form);
  }
  async function uploadCover(file?: File) {
    if (!file) return;
    setCoverBusy(true); setUploadError("");
    try { const url = await uploadEditorImage(file); setCover(url); setDirty(true); }
    catch (error) { setUploadError(error instanceof Error ? error.message : "آپلود انجام نشد."); }
    finally { setCoverBusy(false); }
  }
  return <div className="admin-blog-editor"><header className="admin-blog-heading"><div><Link href="/dashboard/blog" className="blog-back"><ArrowRight size={17} aria-hidden="true" />مدیریت بلاگ</Link><h1>{post ? "ویرایش مقاله" : "یک داستان تازه بنویسید"}</h1><p>{status === "published" ? "منتشرشده" : "پیش‌نویس"} · {dirty ? "تغییرات ذخیره نشده" : "آمادهٔ نوشتن"}</p></div>{id && <Link href={`/dashboard/blog/${id}/preview`} target="_blank" rel="noopener noreferrer" className="blog-button-secondary"><Eye size={17} aria-hidden="true" />پیش‌نمایش ذخیره‌شده</Link>}</header>
    <form action={submit.bind(null, status)} aria-busy={busy}>
      <input type="hidden" name="id" value={id} /><input type="hidden" name="version" value={version} /><input type="hidden" name="content" value={JSON.stringify(content)} /><input type="hidden" name="cover" value={cover} />
      <fieldset disabled={pending} className="blog-form-fields"><div className="blog-editor-main"><label className="blog-field"><span>عنوان مقاله *</span><input name="title" required minLength={3} maxLength={180} value={title} onChange={e => { setTitle(e.target.value); if (!everPublished) setSlug(blogSlug(e.target.value)); setDirty(true); }} placeholder="تیتری که داستان شما را شروع می‌کند…" className="blog-title-input" /></label>
        <label className="blog-field"><span>خلاصهٔ مقاله</span><textarea name="summary" rows={3} maxLength={500} value={summary} onChange={e => { setSummary(e.target.value); setDirty(true); }} placeholder="چند جمله برای معرفی مقاله در کارت‌ها و موتورهای جستجو" /></label>
        <div className="blog-field"><span id="blog-editor-label">محتوای مقاله</span><Editor initial={post?.content ?? BLOG_EMPTY_CONTENT} onChange={onContent} onBusyChange={onBusy} disabled={pending} /></div>
      </div><aside className="blog-editor-sidebar"><div className="blog-editor-panel"><h2>جزئیات انتشار</h2><label className="blog-field"><span>آدرس مقاله</span><input name="slug" value={slug} readOnly aria-describedby="blog-slug-help" /><small id="blog-slug-help">{everPublished ? "آدرس پس از اولین انتشار ثابت می‌ماند." : "آدرس به‌صورت خودکار از عنوان مقاله ساخته می‌شود."}</small></label><label className="blog-field"><span>دسته‌بندی</span><input name="category" value={category} maxLength={60} placeholder="نام دسته‌بندی را بنویسید" onChange={e => { setCategory(e.target.value); setDirty(true); }} /></label></div>
      <div className="blog-editor-panel"><h2>تصویر شاخص</h2>{cover ? <div className="blog-cover-preview"><Image src={cover} alt={coverAlt || "پیش‌نمایش تصویر شاخص"} width={600} height={400} /></div> : <div className="blog-cover-placeholder"><ImagePlus size={32} aria-hidden="true" /><span>ویترین مقالهٔ شما</span></div>}<input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" tabIndex={-1} aria-label="انتخاب تصویر شاخص" onChange={e => { void uploadCover(e.target.files?.[0]); e.target.value = ""; }} /><button type="button" className="blog-button-secondary" disabled={coverBusy} onClick={() => coverInput.current?.click()}>{coverBusy ? "در حال آپلود…" : cover ? "تغییر تصویر" : "انتخاب تصویر"}</button><label className="blog-field"><span>توضیح تصویر برای دسترس‌پذیری</span><input name="coverAlt" maxLength={200} value={coverAlt} onChange={e => { setCoverAlt(e.target.value); setDirty(true); }} placeholder="در این تصویر چه می‌بینیم؟" /></label><small>JPEG، PNG یا WebP، حداکثر ۵ مگابایت</small></div></aside></fieldset>
      <div className="blog-save-bar"><p role="status">{busy ? editorBusy || coverBusy ? "تا تکمیل آپلود تصاویر منتظر بمانید…" : "در حال ذخیره…" : state.message || "برای انتشار، تصویر شاخص، خلاصه و محتوا را تکمیل کنید."}</p><div><button type="submit" className="blog-button-secondary" formAction={submit.bind(null, "draft")} disabled={busy}><Save size={17} aria-hidden="true" />{status === "published" ? "بازگرداندن به پیش‌نویس" : "ذخیرهٔ پیش‌نویس"}</button><button type="submit" className="blog-button" formAction={submit.bind(null, "published")} disabled={busy}><Send size={17} aria-hidden="true" />{status === "published" ? "به‌روزرسانی مقاله" : "انتشار مقاله"}</button></div></div>
      {uploadError && <p className="comment-error" role="alert">{uploadError}</p>}
    </form>
  </div>;
}
