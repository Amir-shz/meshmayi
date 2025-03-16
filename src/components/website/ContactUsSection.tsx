import CommunicationWays from "./CommunicationWays";
import SectionsHeader from "./SectionsHeader";
import SocialsBox from "./SocialsBox";

function ContactUsSection() {
  return (
    <section id="contact-us">
      <SectionsHeader title="ارتباط با ما" />
      <div className=" grid grid-cols-2 gap-8 max-sm:grid-cols-1 max-sm:gap-4 ">
        <SocialsBox />
        <CommunicationWays />
      </div>
    </section>
  );
}

export default ContactUsSection;
