import AboutUsSection from "@/components/website/AboutUsSection";
import ContactUsSection from "@/components/website/ContactUsSection";
import FaqSection from "@/components/website/FaqSection";
import HeroSection from "@/components/website/HeroSection";
import ProductSectionLoader from "@/components/website/ProductSectionLoader";
import ProductsSection from "@/components/website/ProductsSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "زرسازان بهرو",
};

export default function HomePage() {
  return (
    <div className=" col-span-full flex flex-col gap-10">
      <HeroSection />

      <Suspense fallback={<ProductSectionLoader />}>
        <ProductsSection />
      </Suspense>

      <AboutUsSection />
      <ContactUsSection />
      <FaqSection />
    </div>
  );
}
