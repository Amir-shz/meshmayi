import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogCardSkeleton from "./BlogCardSkeleton";
import "@/styles/blog.css";
import "@/styles/skeleton.css";

export default function HomeBlogLoading() {
  return <section className="home-blog" id="journal" aria-busy="true" role="status" aria-label="در حال دریافت مقاله‌های مجله">
    <header className="blog-section-heading"><div><p className="blog-eyebrow">برای مسیر پیش رو</p><h2>خواندنی‌های زرسازان</h2></div><Link href="/blog">همه مقاله‌ها <ArrowLeft size={18} aria-hidden="true" /></Link></header>
    <div className="blog-grid">{[0, 1, 2].map(key => <BlogCardSkeleton key={key} />)}</div>
  </section>;
}
