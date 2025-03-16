import AboutUsSection from "@/components/website/AboutUsSection";
import ContactUsSection from "@/components/website/ContactUsSection";
import FaqSection from "@/components/website/FaqSection";
import HeroSection from "@/components/website/HeroSection";
import ProductsSection from "@/components/website/ProductsSection";

export default async function Home() {
  return (
    <div className=" col-span-full flex flex-col gap-10">
      <HeroSection />
      <ProductsSection />
      <AboutUsSection />
      <ContactUsSection />
      <FaqSection />
    </div>
  );
}
