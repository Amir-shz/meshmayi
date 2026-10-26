import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listBlogPosts } from "@/services/apiBlog";
import BlogCard from "./BlogCard";
import "@/styles/blog.css";

export default async function HomeBlogSection() {
  const data = await listBlogPosts({ limit: 3 }).catch(() => null);
  return <section className="home-blog" id="journal"><header className="blog-section-heading"><div><p className="blog-eyebrow">برای مسیر پیش رو</p><h2>خواندنی‌های زرسازان</h2></div><Link href="/blog">همه مقاله‌ها <ArrowLeft size={18} aria-hidden="true" /></Link></header>{data?.posts.length ? <div className="blog-grid">{data.posts.map(post => <BlogCard key={post._id} post={post} />)}</div> : <div className="blog-empty"><h3>{data ? "اولین داستان‌ها در راه‌اند" : "مجله فعلاً در دسترس نیست"}</h3><p>{data ? "به‌زودی درباره خودروها، تجربه‌ها و انتخاب‌های بهتر می‌خوانیم." : "برای مشاهده مقاله‌ها دوباره تلاش کنید."}</p><Link href="/blog">رفتن به مجله</Link></div>}</section>;
}
