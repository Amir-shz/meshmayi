import Link from "next/link";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { listBlogPosts } from "@/services/apiBlog";
import { commentPage } from "@/lib/commentValidation";
import BlogMasthead from "@/features/blog/components/BlogMasthead";
import BlogCard from "@/features/blog/components/BlogCard";
import BlogCategorySelect from "@/features/blog/components/BlogCategorySelect";
import "@/styles/blog.css";


export const dynamic = "force-dynamic";
export const metadata = { title: "مجله زرسازان | راهنمای دنیای خودرو", description: "مقاله‌ها، تجربه‌ها و راهنمای انتخاب خودروهای وارداتی از زرسازان بهرو" };

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; page?: string }> }) {
  const query = await searchParams;
  const q = typeof query.q === "string" ? query.q.slice(0, 100) : "";
  const category = typeof query.category === "string" ? query.category.slice(0, 60) : "";
  const data = await listBlogPosts({ q, category, page: commentPage(query.page) });
  const cards = data.posts;
  const href = (page: number) => `/blog?${new URLSearchParams({ q, category, page: String(page) })}#articles`;
  return <main className="blog-page blog-index col-span-full"><BlogMasthead />
    <form action="/blog" className="blog-search"><label><Search size={19} aria-hidden="true" /><span className="sr-only">جستجوی عنوان مقاله</span><input name="q" defaultValue={q} placeholder="دنبال چه موضوعی می‌گردید؟" maxLength={100} /></label><BlogCategorySelect key={category} categories={data.categories} defaultValue={category} /><button type="submit">جستجو <ArrowLeft size={17} aria-hidden="true" /></button>{(q || category) && <Link href="/blog">پاک‌کردن فیلترها</Link>}</form>
    <section id="articles" aria-label="مقاله‌های مجله"><div className="blog-section-heading"><h2>{q || category ? "نتیجهٔ جستجوی شما" : "تازه‌ترین خواندنی‌ها"}</h2><span>{data.count.toLocaleString("fa-IR")} مقاله</span></div>{cards.length > 0 && <div className="blog-grid">{cards.map(post => <BlogCard key={post._id} post={post} priority={data.page === 1 && post._id === cards[0]._id} />)}</div>}{!data.posts.length && <div className="blog-empty"><BookOpen size={40} aria-hidden="true" /><h2>{q || category ? "مقاله‌ای با این مشخصات پیدا نشد" : "اولین داستان‌ها در راه‌اند"}</h2><p>{q || category ? "عبارت کوتاه‌تر یا موضوع دیگری را امتحان کنید." : "به‌زودی با مقاله‌ها و تجربه‌های تازه همراهتان خواهیم بود."}</p>{(q || category) && <Link href="/blog">مشاهده همه مقاله‌ها</Link>}</div>}
    {data.pages > 1 && <nav className="blog-pagination" aria-label="صفحه‌بندی مقاله‌ها">{data.page > 1 && <Link href={href(data.page - 1)}>صفحه قبل</Link>}<span>صفحه {data.page.toLocaleString("fa-IR")} از {data.pages.toLocaleString("fa-IR")}</span>{data.page < data.pages && <Link href={href(data.page + 1)}>صفحه بعد</Link>}</nav>}</section>
  </main>;
}
