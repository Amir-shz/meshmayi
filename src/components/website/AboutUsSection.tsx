import AboutCompany from "./AboutCompany";
import HistoryInAbout from "./HistoryInAbout";
import LocationInAbout from "./LocationInAbout";
import SectionsHeader from "./SectionsHeader";

function AboutUsSection() {
  return (
    <section>
      <SectionsHeader title="درباره ما" />
      <div className=" grid grid-cols-12 grid-rows-2 gap-8">
        <AboutCompany />
        <HistoryInAbout />
        <LocationInAbout />
      </div>
    </section>
  );
}

export default AboutUsSection;
