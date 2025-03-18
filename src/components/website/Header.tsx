"use client";

import Link from "next/link";
import Logo from "../Logo";
import CallIconButton from "./CallIconButton";
import HeaderNav from "./HeaderNav";
import HeaderBtn from "./HeaderBtn";
import { usePathname } from "next/navigation";

function Header() {
  const pathName = usePathname();

  return (
    <header className=" fixed top-0 left-1/2 -translate-x-1/2 w-full grid grid-cols-12 gap-8 py-4 max-sm:py-3 bg-neutral-50 z-50 ">
      <div className=" flex justify-between items-center col-span-full mx-12 max-sm:mx-4">
        <HeaderBtn />
        <div
          className={` flex items-center gap-4 max-sm:gap-2 ${
            pathName !== "/" && "hidden"
          }`}
        >
          <Logo />
          <Link href="/">
            <h2 className=" text-h5_B_desktop max-sm:text-h5_SB_mobile text-primary-500">
              زرسازان بهرو
            </h2>
          </Link>
        </div>
        <HeaderNav />
        <CallIconButton size="lg" />
      </div>
    </header>
  );
}

export default Header;
