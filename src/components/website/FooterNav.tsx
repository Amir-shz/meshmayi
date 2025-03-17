"use client";

import { NAV_ITEMS } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function FooterNav() {
  const pathName = usePathname();

  return (
    <nav
      className={`p-1 rounded-lg border border-neutral-300 w-fit mx-auto ${
        pathName !== "/" ? "hidden" : "block"
      }`}
    >
      <ul className="flex justify-center gap-4 max-sm:gap-2 [&>li]:py-1  [&>li]:px-3 [&>li]:rounded-lg">
        {NAV_ITEMS.filter((item) => item.id !== "products").map((navItem) => (
          <li
            key={navItem.id}
            className="hover:bg-primary-50 duration-300 max-sm:text-lb2_mobile"
          >
            <Link href={`#${navItem.id}`}>{navItem.title}</Link>
          </li>
        ))}

        {/* <li className="hover:bg-primary-50 duration-300">
          <Link href="#home">صفحه اصلی</Link>
        </li>
        <li className="hover:bg-primary-50 duration-300">
          <Link href="#about-us">درباره ما</Link>
        </li>
        <li className="hover:bg-primary-50 duration-300">
          <Link href="#contact-us">ارتباط با ما</Link>
        </li>
        <li className="hover:bg-primary-50 duration-300">
          <Link href="#faq">سوالات متداول</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default FooterNav;
