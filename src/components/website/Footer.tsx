"use client";

import { usePathname } from "next/navigation";
import FooterBottomSection from "./FooterBottomSection";
import FooterNav from "./FooterNav";
import FooterTopSection from "./FooterTopSection";

function Footer() {
  const pathName = usePathname();

  const isProductPage = /^\/products\/[a-f\d]{24}$/.test(pathName)
    ? true
    : false;

  return (
    <footer
      className={` ${
        isProductPage && "max-sm:hidden"
      } col-span-full mt-40 max-sm:mt-14`}
    >
      <FooterNav />
      <FooterTopSection />
      <div className=" bg-primary-200 h-[0.125rem] mb-2 -mx-6 max-sm:-mx-2 ">
        {" "}
      </div>
      <FooterBottomSection />
    </footer>
  );
}

export default Footer;
