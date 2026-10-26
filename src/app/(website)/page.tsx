import ConsultationBanner from "@/features/home/components/ConsultationBanner";
import AboutUsSection from "@/features/home/components/AboutUsSection";
import ContactUsSection from "@/features/home/components/ContactUsSection";
import FaqSection from "@/features/home/components/FaqSection";
import HeroSection from "@/features/home/components/HeroSection";
import HomeProductsLoading from "@/features/home/components/HomeProductsLoading";
import ProductsSection from "@/features/home/components/ProductsSection";
import { Metadata } from "next";
import { Suspense } from "react";
import HomeBlogSection from "@/features/blog/components/HomeBlogSection";
import HomeBlogLoading from "@/features/blog/components/HomeBlogLoading";


export const revalidate = 0;

export const metadata: Metadata = {
  title: "زرسازان بهرو",
};

export default function HomePage() {
  return (
    <div className="home-page col-span-full">
      <HeroSection />

      <Suspense fallback={<HomeProductsLoading />}>
        <ProductsSection />
      </Suspense>

      <AboutUsSection />
      <ConsultationBanner />
      <Suspense fallback={<HomeBlogLoading />}><HomeBlogSection /></Suspense>
      <ContactUsSection />
      <FaqSection />
    </div>
  );
}
