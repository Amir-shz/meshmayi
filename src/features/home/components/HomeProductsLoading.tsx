import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CarGridSkeleton from "@/components/loading/CarGridSkeleton";

export default function HomeProductsLoading() {
  return <section id="products" className="home-section" role="status" aria-label="در حال دریافت خودروها" aria-busy="true">
    <div className="home-section-heading"><div><p className="eyebrow">برای مسیر پیش روی شما</p><h2>خودروی بعدی شما</h2></div><Link className="text-link" href="/products">همه خودروها <ArrowLeft size={18} aria-hidden="true" /></Link></div>
    <CarGridSkeleton />
  </section>;
}
