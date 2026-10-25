import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowDownLeft } from "lucide-react";

// Adapted from ravikatiyar162's Minimalist Hero on 21st.dev.
export default function HeroSection() {
  return (
    <section id="home" className="home-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span /> هلدینگ زرسازان بهرو
        </p>
        <h1 id="hero-title">
          مسیر تازه،
          <br />
          انتخاب <em>متمایز.</em>
        </h1>
        <p className="hero-description">
          دنیای خودروهای وارداتی را با نگاهی تازه ببینید.
          <br />
          از انتخاب تا خرید، همراه شما هستیم.
        </p>
        <div className="hero-actions">
          <Link className="design-button" href="/products">
            مشاهده خودروها <ArrowLeft size={19} />
          </Link>
          <a className="design-button design-button-outline" href="#contact-us">
            دریافت مشاوره
          </a>
        </div>
        <div className="hero-footnote">
          <span className="small-rule" /> انتخابی آگاهانه، همراهی مطمئن
        </div>
      </div>
      <div className="hero-visual">
        <Image
          src="/images/hero-mercedes.jpg"
          alt="خودروی سفید مرسدس بنز در فضای شهری"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 60vw"
          className="hero-car-image"
        />
        <div className="hero-image-label">
          <span>نگاهی فراتر به رانندگی</span>
          <span dir="ltr">A NEW PERSPECTIVE</span>
        </div>
        <a
          href="#products"
          className="hero-explore"
          aria-label="رفتن به خودروها"
        >
          <ArrowDownLeft size={25} />
        </a>
      </div>
    </section>
  );
}
