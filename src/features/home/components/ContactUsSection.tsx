import { ArrowUpLeft, Phone, Mail } from "lucide-react";
import { PHONE_NUMBER, EMAIL } from "@/utils/utils";
import SocialLinks from "@/components/website/SocialLinks";

export default function ContactUsSection() {
  return (
    <section id="contact-us" className="home-section">
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">همیشه یک راه ارتباطی هست</p>
          <h2>گفت‌وگو کنیم</h2>
        </div>
        <p className="section-note">پاسخ‌گوی پرسش‌های شما هستیم.</p>
      </div>
      <div className="home-contact-grid">
        <div className="contact-direct">
          <a href={"tel:" + PHONE_NUMBER}>
            <Phone size={24} />
            <div>
              <span>تماس با مشاوران</span>
              <strong dir="ltr">۰۹۹۰۱۰۹۴۹۳۳</strong>
            </div>
            <ArrowUpLeft size={21} />
          </a>
          <a href={"mailto:" + EMAIL}>
            <Mail size={24} />
            <div>
              <span>برای ما بنویسید</span>
              <strong dir="ltr">{EMAIL}</strong>
            </div>
            <ArrowUpLeft size={21} />
          </a>
        </div>
        <div className="contact-social">
          <h3>در ارتباط بمانیم</h3>
          <p>
            خبرها و تازه‌های زرسازان بهرو را در شبکه‌های اجتماعی دنبال کنید.
          </p>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
