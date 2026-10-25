import { ArrowUpLeft, MapPin, Sparkles } from "lucide-react";
import MapLocation from "@/components/website/MapLocation";

export default function AboutUsSection() {
  return (
    <section id="about-us" className="home-section">
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">آشنایی با زرسازان بهرو</p>
          <h2>پشت هر انتخاب، یک همراه</h2>
        </div>
        <span className="section-note">از بازرگان، برای مسیرهای تازه</span>
      </div>
      <div className="home-about-grid">
        <article className="about-story">
          <Sparkles size={29} strokeWidth={1.4} />
          <h3>
            تجربه‌ای مطمئن از
            <br />
            انتخاب تا خرید خودرو
          </h3>
          <p>
            هلدینگ زرسازان بهرو، واردکننده خودرو سواری خارجی، خصوصاً در چارچوب
            مصوبه خودروی جانبازان معزز، به مدیریت دکتر جمال مشمایی است.
          </p>
          <p>
            گروهی از متخصصان صنعت خودرو با شناخت نیاز بازار ایران به خودروهای
            باکیفیت و خدمات پس از فروش مطمئن، این مجموعه را با هدف ارائه خدمات
            استاندارد بنیان گذاشتند. تمرکز ما بر کیفیت، رضایت مشتری و همراهی در
            انتخاب خودروهای سبک خارجی است.
          </p>
          <a className="text-link" href="#contact-us">
            بیشتر با ما آشنا شوید <ArrowUpLeft size={19} />
          </a>
        </article>
        <article className="about-history">
          <span className="history-year">
            ۱۴۰۰<span>آغاز مسیر ما</span>
          </span>
          <div>
            <h3>سابقه‌ای برای ادامهٔ راه</h3>
            <p>
              گروه تجاری زرسازان از سال ۱۴۰۰ با شناسایی و نیازسنجی بازار خودرو
              در ایران، فعالیت تخصصی خود را در زمینه واردات خودروی خارجی آغاز
              کرد و اکنون در زمینه واردات خودروی جانبازان طبق مصوبه هیئت وزیران
              فعالیت دارد.
            </p>
          </div>
        </article>
        <article className="about-location">
          <div>
            <MapPin size={23} />
            <h3>اینجا، منتظر دیدارتان هستیم</h3>
            <p>
              منطقه آزاد ماکو، شهر بازرگان، خیابان امام، پلاک ۱۰۹۶، طبقه اول،
              هلدینگ زرسازان بهرو
            </p>
          </div>
          <div className="home-map">
            <MapLocation />
          </div>
        </article>
      </div>
    </section>
  );
}
