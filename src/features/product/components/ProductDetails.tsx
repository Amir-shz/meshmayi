import { Check, FileText, Settings2, Sparkles } from "lucide-react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { CarDetail } from "../types/carDetail";

export default function ProductDetails({ car }: { car: CarDetail }) {
  return (
    <div className="product-details">
      <nav className="product-section-nav" aria-label="بخش‌های اطلاعات خودرو">
        <a href="#specifications">مشخصات فنی</a><a href="#equipment">امکانات و آپشن‌ها</a><a href="#description">درباره خودرو</a><a href="#comments">دیدگاه‌ها</a>
      </nav>
      <section id="specifications" className="product-section">
        <div className="product-section-title"><Settings2 aria-hidden="true" /><h2>جزئیاتی که تفاوت می‌سازند</h2></div>
        <p className="product-section-caption">مشخصات فنی {car.name}</p>
        {car.technicalSpecifications.length ? <dl className="product-specs">{car.technicalSpecifications.map((spec, index) => <div key={spec._id || index}><dt>{digitsEnToFa(spec.label)}</dt><dd>{digitsEnToFa(spec.description)}</dd></div>)}</dl> : <p className="product-empty">مشخصات فنی به‌زودی تکمیل می‌شود.</p>}
      </section>
      <section id="equipment" className="product-section">
        <div className="product-section-title"><Sparkles aria-hidden="true" /><h2>امکانات و آپشن‌ها</h2></div>
        <p className="product-section-caption">برای تجربه‌ای راحت‌تر در هر مسیر</p>
        {car.options.length ? <ul className="product-options">{car.options.map((option, index) => <li key={index}><Check size={17} aria-hidden="true" />{digitsEnToFa(option)}</li>)}</ul> : <p className="product-empty">برای جزئیات امکانات با مشاوران تماس بگیرید.</p>}
      </section>
      <section id="description" className="product-section product-description">
        <div className="product-section-title"><FileText aria-hidden="true" /><h2>بیشتر با این خودرو آشنا شوید</h2></div>
        {car.descriptions.length ? car.descriptions.map((description, index) => <p key={index}>{digitsEnToFa(description)}</p>) : <p>برای آشنایی بیشتر با این خودرو و شرایط خرید، با مشاوران ما گفت‌وگو کنید.</p>}
      </section>
    </div>
  );
}
