import Image from "next/image";
import SectionsHeader from "./SectionsHeader";
import faqVector from "@/../public/faqVector.svg";

import { Accordion } from "@/components/ui/accordion";
import FaqItem from "./FaqItem";
import { FAQ_ITEMS } from "@/utils/utils";

function FaqSection() {
  return (
    <section id="faq" className=" flex gap-7 max-lg:flex-col max-lg:gap-4">
      <div className=" basis-1/2 max-sm:basis-auto">
        <SectionsHeader title="سوالات متداول" />
        <Accordion
          type="multiple"
          className="w-full space-y-4 max-lg:space-y-3"
        >
          {FAQ_ITEMS.map((faq) => (
            <FaqItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </Accordion>
      </div>
      <div className=" basis-1/2 max-sm:basis-auto">
        <Image src={faqVector} alt="faqVector" />
      </div>
    </section>
  );
}

export default FaqSection;
