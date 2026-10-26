import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { getCar } from "@/services/apiCars";
import ProductGallery from "@/features/product/components/ProductGallery";
import ProductPurchase from "@/features/product/components/ProductPurchase";
import ProductDetails from "@/features/product/components/ProductDetails";
import "@/styles/product.css";
import "@/styles/comments.css";
import ProductComments from "@/features/comments/components/ProductComments";
import { commentPage } from "@/lib/commentValidation";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function CarPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ commentsPage?: string }> }) {
  const { id } = await params;
  const car = await getCar(id);
  if (!car) notFound();
  const query = await searchParams;
  return (
    <main className="product-page col-span-full">
      <nav aria-label="مسیر صفحه" className="product-breadcrumb">
        <Link href="/">خانه</Link><ChevronLeft aria-hidden="true" size={14} />
        <Link href="/products">خودروها</Link><ChevronLeft aria-hidden="true" size={14} />
        <span aria-current="page">{car.name}</span>
      </nav>
      <header className="product-heading">
        <div>
          <p className="product-eyebrow">انتخابی برای مسیر پیش رو</p>
          <h1>{car.name}</h1>
          <div className="product-meta"><span>مدل {digitsEnToFa(String(car.model))}</span>{car.labels.map((label, i) => <span key={i}>{label}</span>)}</div>
        </div>
        <Link href="/products" className="product-back">همه خودروها <ArrowLeft size={18} aria-hidden="true" /></Link>
      </header>
      <div className="product-layout">
        <div className="product-content">
          <ProductGallery pictures={car.pictures} name={car.name} />
          <ProductDetails car={car} />
        </div>
        <ProductPurchase price={car.price} colors={car.colors} />
      </div>
      <ProductComments carId={id} page={commentPage(query.commentsPage)} />
    </main>
  );
}
