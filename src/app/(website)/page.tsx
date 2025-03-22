import AboutUsSection from "@/components/website/AboutUsSection";
import ContactUsSection from "@/components/website/ContactUsSection";
import FaqSection from "@/components/website/FaqSection";
import HeroSection from "@/components/website/HeroSection";
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
      <Suspense
        fallback={
          <div className=" grid grid-cols-2 sm:grid-cols-3 sm:gap-8 gap-3 [&>div]:rounded-lg [&>div]:w-full [&>div]:h-[282px] sm:[&>div]:h-[400px] [&>div]:bg-neutral-200 [&>div]:animate-pulse">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className=" max-sm:hidden"></div>
            <div className=" max-sm:hidden"></div>
          </div>
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
