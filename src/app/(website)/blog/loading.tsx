import "@/styles/blog.css";
import "@/styles/skeleton.css";
import BlogMasthead from "@/features/blog/components/BlogMasthead";
import BlogCardSkeleton from "@/features/blog/components/BlogCardSkeleton";
import Skeleton from "@/components/loading/Skeleton";
export default function BlogLoading() {
  return <main className="blog-page blog-index col-span-full" aria-busy="true" role="status" aria-label="در حال دریافت مقاله‌های مجله"><BlogMasthead />
    <div className="blog-search blog-search-skeleton" aria-hidden="true"><Skeleton className="blog-skeleton-search" /><Skeleton className="blog-skeleton-select" /><Skeleton className="blog-skeleton-submit" /></div>
    <div className="blog-section-heading"><h2>تازه‌ترین خواندنی‌ها</h2><Skeleton className="blog-skeleton-count" /></div>
    <div className="blog-grid">{Array.from({ length: 9 }, (_, key) => <BlogCardSkeleton key={key} />)}</div>
  </main>;
}
