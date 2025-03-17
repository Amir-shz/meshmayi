import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import vector from "../../public/404.svg";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "صفحه مورد نظر يافت نشد",
};
function NotFound() {
  return (
    <div className=" h-dvh w-screen flex items-center gap-36 bg-neutral-50 px-16 max-sm:flex-col max-sm:gap-20 max-sm:px-4">
      <Image src={vector} alt="not found" className=" w-[50rem] max-sm:mt-40" />
      <div className=" flex flex-col text-neutral-500">
        <p className=" text-h2_SB_desktop max-sm:text-h2_SB_mobile mb-2">
          صفحه مورد نظرت پیدا نشد...
        </p>
        <p className=" text-p1_M_desktop max-sm:text-p3_M_mobile mb-6">
          متاسفانه صفحه‌ای که دنبالش بودی در دسترس نیست
        </p>
        <Link href="/">
          <Button fullWidth size="big">
            صفحه اصلی
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
