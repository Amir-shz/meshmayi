import Link from "next/link";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import WhatsappIcon from "../icons/WhatsappIcon";
import { EMAIL, PHONE_NUMBER, WHATSAPP_LINK } from "@/utils/utils";

function BuyingAdvice() {
  return (
    <div className=" p-4 flex flex-col gap-4 max-sm:gap-3 rounded-lg border border-neutral-300 bg-neutral-100">
      <div className=" flex items-center gap-2 max-sm:gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          className=" size-8 max-sm:size-6"
        >
          <path
            d="M12.8846 22.6667H19.1152M15.9999 4V5.33333M24.4852 7.51472L23.5424 8.45753M28 15.9999H26.6667M5.33333 15.9999H4M8.45746 8.45753L7.51465 7.51472M11.2859 20.7141C8.68239 18.1106 8.68239 13.8895 11.2859 11.286C13.8894 8.68249 18.1105 8.68249 20.714 11.286C23.3175 13.8895 23.3175 18.1106 20.714 20.7141L19.9845 21.4435C19.1407 22.2874 18.6666 23.4319 18.6666 24.6253V25.3333C18.6666 26.8061 17.4727 28 15.9999 28C14.5272 28 13.3333 26.8061 13.3333 25.3333V24.6253C13.3333 23.4319 12.8592 22.2874 12.0153 21.4435L11.2859 20.7141Z"
            stroke="#701C1C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className=" text-h5_SB_desktop max-sm:text-h5_SB_mobile text-neutral-800 leading-8">
          مشاوره خرید
        </p>
      </div>
      <ul className=" text-neutral-500 leading-[2.125rem] max-sm:leading-[2.125rem] font-medium text-sm max-sm:text-base [&>li]:flex [&>li]:gap-1 [&_span:first-child]:text-4xl [&_span:first-child]:leading-6">
        <li>
          <span>.</span>
          <span>مشاوره درباره روش خرید</span>
        </li>
        <li>
          <span>.</span>
          <span>مشاوره درباره قیمت‌ها</span>
        </li>
        <li>
          <span>.</span>
          <span>مشاوره درباره نحوه پرداخت</span>
        </li>
        <li>
          <span>.</span>
          <span>همراه شما تا خرید</span>
        </li>
      </ul>
      <div className=" flex items-center gap-4 justify-center max-sm:justify-between max-sm:px-3 [&_svg]:size-10 [&_svg]:text-neutral-500 [&_svg]:m-1 max-sm:[&_svg]:size-8">
        <Link href={`tel:${PHONE_NUMBER}`} target="_blank">
          <HiOutlinePhone />
        </Link>
        <Link href={`mailto:${EMAIL}`} target="_blank">
          <HiOutlineMail />
        </Link>
        <Link href={`${WHATSAPP_LINK}`} target="_blank">
          <WhatsappIcon />
        </Link>
      </div>
    </div>
  );
}

export default BuyingAdvice;
