import Image from "next/image";
import AboutCompany from "./AboutCompany";
import HistoryInAbout from "./HistoryInAbout";
import LocationInAbout from "./LocationInAbout";
import SectionsHeader from "./SectionsHeader";

import aboutPhoto from "@/../public/aboutUs.svg";

function AboutUsSection() {
  return (
    <section id="about-us">
      <SectionsHeader title="درباره ما" />
      <div className=" grid grid-cols-12 grid-rows-2 gap-8 max-lg:gap-4 max-sm:grid-cols-1 max-sm:grid-rows-none max-sm:gap-4">
        <AboutCompany />
        <HistoryInAbout />
        <LocationInAbout />
      </div>
      <div className="mt-10 h-[32rem] max-sm:h-28">
        <Image
          src={aboutPhoto}
          alt="zarsazan"
          loading="lazy"
          className=" w-full h-full object-contain"
        />
      </div>
    </section>
  );
}

export default AboutUsSection;
