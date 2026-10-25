import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ConsultationBanner() {
  return (
    <section
      className="consultation-banner"
      aria-labelledby="consultation-title"
    >
      <div className="consultation-copy">
        <p className="eyebrow">یک انتخاب، یک همراه مطمئن</p>
        <h2 id="consultation-title">
          راه انتخاب شما،
          <br />
          از یک گفت‌وگو شروع می‌شود.
        </h2>
        <p>درباره خودروها، روش خرید و شرایط واردات از ما بپرسید.</p>
        <a href="#contact-us" className="design-button">
          دریافت مشاوره <ArrowLeft size={18} />
        </a>
      </div>
      <div className="consultation-image">
        <Image
          src="/images/consultation-mercedes.jpg"
          alt="نمای نزدیک خودروهای مرسدس بنز"
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
