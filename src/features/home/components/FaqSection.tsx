import { ArrowUpLeft } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/utils/utils";
import FaqItem from "./FaqItem";

export default function FaqSection() {
  return (
    <section id="faq" className="home-section home-faq">
      <div className="faq-intro">
        <p className="eyebrow">پیش از شروع مسیر</p>
        <h2>
          شاید سؤال شما
          <br />
          هم باشد.
        </h2>
        <p>پاسخ چند پرسش درباره واردات خودرو و خدمات ویژه جانبازان.</p>
        <a href="#contact-us" className="text-link">
          پرسش دیگری دارید؟ <ArrowUpLeft size={19} />
        </a>
      </div>
      <Accordion type="single" collapsible className="home-accordion">
        {FAQ_ITEMS.map((faq) => (
          <FaqItem key={faq.id} {...faq} />
        ))}
      </Accordion>
    </section>
  );
}
