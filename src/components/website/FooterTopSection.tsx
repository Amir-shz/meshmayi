import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import Logo from "../Logo";
import MapLocation from "./MapLocation";

function FooterTopSection() {
  return (
    <div className=" mt-10 flex items-center justify-between mb-6">
      <div className=" flex flex-col gap-10">
        <div className=" flex gap-3 items-center">
          <Logo />
          <p className=" text-h5_B_desktop text-neutral-700">
            شرکت زرسازان بهرو
          </p>
        </div>
        <div className=" text-neutral-500 flex gap-4 items-center">
          <HiOutlinePhone className=" size-10 ml-4" />
          <p className="text-h5_B_desktop">۰۹۱۳۱۲۳۴۵۶۷</p>
        </div>
        <div className=" text-neutral-500 flex gap-4 items-center">
          <HiOutlineMail className=" size-10 ml-4" />
          <p className="text-h5_B_desktop">omid.uxwork@gmail.com</p>
        </div>
      </div>
      <div className="max-w-sm">
        <div className=" rounded-lg overflow-hidden border border-neutral-300">
          <MapLocation />
        </div>
        <div className=" flex gap-4 items-center mt-4">
          <HiOutlineLocationMarker className=" size-10 text-neutral-500" />
          <p className=" text-p1_M_desktop text-neutral-500">
            منطقه آزاد ماکو، شهر بازرگان، خیابان امام، پلاک ۱۰۹۶، طبقه اول، شرکت
            زرسازان بهرو
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterTopSection;
