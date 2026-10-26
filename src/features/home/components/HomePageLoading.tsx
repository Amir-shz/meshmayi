import HeroSection from "./HeroSection";
import HomeProductsLoading from "./HomeProductsLoading";
import AboutUsSection from "./AboutUsSection";
import ConsultationBanner from "./ConsultationBanner";
import ContactUsSection from "./ContactUsSection";
import FaqSection from "./FaqSection";
import HomeBlogLoading from "@/features/blog/components/HomeBlogLoading";

export default function HomePageLoading() {
  return <div className="home-page col-span-full"><HeroSection /><HomeProductsLoading /><AboutUsSection /><ConsultationBanner /><HomeBlogLoading /><ContactUsSection /><FaqSection /></div>;
}
