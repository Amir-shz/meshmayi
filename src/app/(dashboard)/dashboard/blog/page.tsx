import Link from "next/link";
import { Plus, PenLine, Eye, BookOpen } from "lucide-react";
import { listBlogPosts } from "@/services/apiBlog";
import { commentPage } from "@/lib/commentValidation";
import BlogDeleteButton from "@/features/blog/components/BlogDeleteButton";
import "@/styles/blog.css";


export const dynamic = "force-dynamic";
export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const query = await searchParams;
  const q = typeof query.q === "string" ? query.q.slice(0, 100) : "",
    status = typeof query.status === "string" ? query.status : "";
  const data = await listBlogPosts({
    admin: true,
    q,
    status,
    page: commentPage(query.page),
  });
  const href = (page: number) =>
    `/dashboard/blog?${new URLSearchParams({ q, status, page: String(page) })}`;
  return (
    <div className="admin-blog">
      <header className="admin-blog-heading">
        <div>
          <p className="blog-eyebrow">داستان‌ها و تجربه‌های شما</p>
          <h1>مدیریت مجله</h1>
          <p>{data.count.toLocaleString("fa-IR")} مقاله</p>
        </div>
        <Link href="/dashboard/blog/new" className="blog-button">
          <Plus size={18} aria-hidden="true" />
          نوشتن مقاله
        </Link>
      </header>
      <form className="blog-search" action="/dashboard/blog">
        <label>
          <span className="sr-only">جستجوی مقاله</span>
          <input
            name="q"
            placeholder="جستجوی عنوان مقاله…"
            defaultValue={q}
            maxLength={100}
          />
        </label>
        <label>
          <span className="sr-only">وضعیت انتشار</span>
          <select name="status" defaultValue={status}>
            <option value="">همه وضعیت‌ها</option>
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشرشده</option>
          </select>
        </label>
        <button type="submit">جستجو</button>
      </form>
      <div className="admin-blog-list">
        {!data.posts.length && (
          <div className="blog-empty">
            <BookOpen size={40} aria-hidden="true" />
            <h2>اینجا، جای داستان‌های شماست</h2>
            <p>مقالهٔ جدید بنویسید یا فیلتر جستجو را تغییر دهید.</p>
          </div>
        )}
        {data.posts.map((post) => (
          <article key={post._id} className="admin-blog-row">
            <div>
              <span className={`blog-status status-${post.status}`}>
                {post.status === "published" ? "منتشرشده" : "پیش‌نویس"}
              </span>
              <h2>{post.title}</h2>
              <p>
                {post.category || "بدون دسته‌بندی"} · آخرین ویرایش{" "}
                {new Date(post.updatedAt).toLocaleDateString("fa-IR")}
              </p>
            </div>
            <div className="admin-blog-row-actions">
              <Link href={`/dashboard/blog/${post._id}`}>
                <PenLine size={16} aria-hidden="true" />
                ویرایش
              </Link>
              <Link href={`/dashboard/blog/${post._id}/preview`}>
                <Eye size={16} aria-hidden="true" />
                پیش‌نمایش
              </Link>
              {post.status === "published" && (
                <Link href={`/blog/${post.slug}`}>مشاهده در سایت</Link>
              )}
              <BlogDeleteButton id={post._id} />
            </div>
          </article>
        ))}
        {data.pages > 1 && (
          <nav
            className="blog-pagination"
            aria-label="صفحه‌بندی مدیریت مقاله‌ها"
          >
            {data.page > 1 && <Link href={href(data.page - 1)}>قبل</Link>}
            <span>
              {data.page.toLocaleString("fa-IR")} از{" "}
              {data.pages.toLocaleString("fa-IR")}
            </span>
            {data.page < data.pages && (
              <Link href={href(data.page + 1)}>بعد</Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
