import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { ArrowUpLeft, Mail, MessageCircle, Phone, Headphones } from "lucide-react";
import { COLORS, EMAIL, PHONE_NUMBER, WHATSAPP_LINK } from "@/utils/utils";

export default function ProductPurchase({ price, colors }: { price: number; colors: string[] }) {
  const formattedPrice = price > 0 ? digitsEnToFa(addCommas(String(price))) : "تماس بگیرید";
  return (
    <aside className="product-purchase">
      <div className="product-purchase-card">
        <p className="product-eyebrow">یک قدم تا انتخاب شما</p>
        <h2>قیمت خودرو</h2>
        <p className="product-price">{formattedPrice}{price > 0 && <span>یورو</span>}</p>
        <p className="product-price-note">برای اطلاع از قیمت نهایی و شرایط خرید، با مشاوران ما در ارتباط باشید.</p>
        {colors.length > 0 && <div className="product-colors"><h3>رنگ‌های ارائه‌شده</h3><div>{colors.map((value, index) => {
          const color = COLORS.find((item) => item.value === value);
          return <span className="product-color" key={index}><i style={{ backgroundColor: color ? `#${color.code}` : undefined }} aria-hidden="true" />{color?.label || value}</span>;
        })}</div></div>}
        <a className="product-cta" href={`tel:${PHONE_NUMBER}`}><Phone size={19} aria-hidden="true" />مشاوره خرید خودرو<ArrowUpLeft size={20} aria-hidden="true" /></a>
        <a className="product-secondary-cta" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" />گفت‌وگو در واتس‌اپ</a>
        <a className="product-email" href={`mailto:${EMAIL}`}><Mail size={16} aria-hidden="true" />ارتباط از طریق ایمیل</a>
      </div>
      <div className="product-advice"><Headphones size={26} aria-hidden="true" /><div><h3>با آگاهی انتخاب کنید</h3><p>از بررسی مشخصات تا روش خرید و نحوه پرداخت؛ همراه شما هستیم.</p></div></div>
      <div className="product-mobile-bar"><div><small>قیمت خودرو</small><strong>{formattedPrice}{price > 0 && <small> یورو</small>}</strong></div><a href={`tel:${PHONE_NUMBER}`}><Phone size={18} aria-hidden="true" />مشاوره خرید</a></div>
    </aside>
  );
}
