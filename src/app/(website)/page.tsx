import AboutUsSection from "@/components/website/AboutUsSection";
import ContactUsSection from "@/components/website/ContactUsSection";
import FaqSection from "@/components/website/FaqSection";
import HeroSection from "@/components/website/HeroSection";
import ProductsSection from "@/components/website/ProductsSection";
import SectionsHeader from "@/components/website/SectionsHeader";
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
      <Suspense
        fallback={
          <>
            <SectionsHeader
              title="محصولات"
              href="/products"
              linkTitle="محصولات بیشتر"
            />
            <div className=" sm:grid max-sm:flex max-sm:shrink-0 sm:grid-cols-3 sm:gap-8 gap-3 [&>div]:rounded-lg max-sm:[&>div]:min-w-[249px] sm:w-full max-sm:overflow-hidden max-sm:-ml-4 [&>div]:h-[282px] sm:[&>div]:h-[400px] max-sm:flex-nowrap [&>div]:bg-neutral-200 [&>div]:animate-pulse">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className=" max-sm:hidden"></div>
              <div className=" max-sm:hidden"></div>
            </div>
            <div className=" sm:hidden -mt-8 max-sm:flex max-sm:shrink-0 gap-3 [&>div]:rounded-lg max-sm:[&>div]:min-w-[249px] [&>div]:h-[282px] max-sm:overflow-hidden max-sm:-ml-4 max-sm:flex-nowrap [&>div]:bg-neutral-200 [&>div]:animate-pulse">
              <div></div>
              <div></div>
            </div>
          </>
        }
      >
        <ProductsSection />
      </Suspense>

      <AboutUsSection />
      <ContactUsSection />
      <FaqSection />
    </div>
  );
}
