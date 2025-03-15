import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import Logo from "../Logo";

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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25093.316222676673!2d51.678570483023194!3d32.666562457084964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc4a0acf002bcf%3A0x2ab8c5bef81f4ce8!2sJame&#39;%20Mosque%20of%20Isfahan!5e0!3m2!1sen!2sde!4v1742072020020!5m2!1sen!2sde"
            loading="lazy"
            className=" size-full"
          ></iframe>
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
