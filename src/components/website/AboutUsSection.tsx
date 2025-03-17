import AboutCompany from "./AboutCompany";
import HistoryInAbout from "./HistoryInAbout";
import LocationInAbout from "./LocationInAbout";
import SectionsHeader from "./SectionsHeader";

function AboutUsSection() {
  return (
    <section id="about-us">
      <SectionsHeader title="درباره ما" />
      <div className=" grid grid-cols-12 grid-rows-2 gap-8 max-sm:grid-cols-1 max-sm:grid-rows-none max-sm:gap-4">
        <AboutCompany />
        <HistoryInAbout />
        <LocationInAbout />
      </div>
      <div className=" h-[32.75rem] bg-primary-50 mt-10 max-sm:h-28"></div>
    </section>
  );
}

export default AboutUsSection;
