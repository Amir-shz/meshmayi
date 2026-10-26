import Link from "next/link";
import { ArrowUpLeft, Mail, MapPin, Phone } from "lucide-react";
import { NAV_ITEMS, EMAIL, PHONE_NUMBER } from "@/utils/utils";
import LogoName from "./LogoName";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="design-footer col-span-full">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="صفحه اصلی زرسازان بهرو">
            <LogoName />
          </Link>
          <p>
            مسیر تازه، انتخاب متمایز.
            <br />
            همراه شما در دنیای خودروهای وارداتی.
          </p>
          <SocialLinks />
        </div>
        <nav aria-label="دسترسی سریع">
          <h2>دسترسی سریع</h2>
          {NAV_ITEMS.filter((item) => item.id !== "home").map((item) => (
            <Link key={item.id} href={"/#" + item.id}>
              {item.title}
            </Link>
          ))}
          <Link href="/products">همه خودروها</Link>
          <Link href="/blog">مجله زرسازان</Link>
        </nav>
        <div className="footer-address">
          <h2>نشانی ما</h2>
          <p>
            <MapPin size={20} /> منطقه آزاد ماکو، شهر بازرگان، خیابان امام، پلاک
            ۱۰۹۶، طبقه اول، هلدینگ زرسازان بهرو
          </p>
          <a href={"tel:" + PHONE_NUMBER} className="footer-contact">
            <Phone size={20} aria-hidden="true" />
            <span dir="ltr">۰۹۹۰۱۰۹۴۹۳۳</span>
          </a>
          <a href={"mailto:" + EMAIL} className="footer-contact">
            <Mail size={20} aria-hidden="true" />
            <span dir="ltr">{EMAIL}</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© تمامی حقوق متعلق به گروه زرسازان است.</p>
        <a href="#top">
          بازگشت به بالا <ArrowUpLeft size={17} />
        </a>
        <span dir="ltr">ZARSAZAN BEHRO</span>
      </div>
    </footer>
  );
}
