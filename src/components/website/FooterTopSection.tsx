import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import Logo from "../Logo";
import MapLocation from "./MapLocation";

function FooterTopSection() {
  return (
    <div className=" mt-10 flex items-center justify-between mb-6 max-sm:flex-col">
      <div className=" flex flex-col gap-10 max-sm:gap-4 max-sm:items-center max-sm:mb-5">
        <div className=" flex gap-3 items-center max-sm:gap-2 max-sm:mb-4">
          <Logo />
          <p className=" text-h5_B_desktop max-sm:text-h5_SB_mobile text-neutral-700">
            شرکت زرسازان بهرو
          </p>
        </div>
        <div className=" text-neutral-500 flex gap-4 items-center max-sm:flex-col max-sm:gap-1">
          <HiOutlinePhone className=" size-10 ml-4 max-sm:size-6 max-sm:ml-0" />
          <p className="text-h5_B_desktop max-sm:text-p1_M_mobile">
            ۰۹۱۳۱۲۳۴۵۶۷
          </p>
        </div>
        <div className=" text-neutral-500 flex gap-4 items-center max-sm:flex-col max-sm:gap-1">
          <HiOutlineMail className=" size-10 ml-4 max-sm:size-6 max-sm:ml-0" />
          <p className="text-h5_B_desktop max-sm:text-p1_M_mobile">
            omid.uxwork@gmail.com
          </p>
        </div>
      </div>
      <div className="max-w-sm max-sm:max-w-full">
        <div className=" rounded-lg overflow-hidden border border-neutral-300">
          <MapLocation />
        </div>
        <div className=" flex gap-4 items-center mt-4 max-sm:mt-3 max-sm:gap-2">
          <HiOutlineLocationMarker className=" size-10 max-sm:size-8 max-sm:m-1 text-neutral-500" />
          <p className=" text-p1_M_desktop max-sm:text-base max-sm:leading-5 max-sm:font-medium text-neutral-500">
            منطقه آزاد ماکو، شهر بازرگان، خیابان امام، پلاک ۱۰۹۶، طبقه اول، شرکت
            زرسازان بهرو
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterTopSection;
