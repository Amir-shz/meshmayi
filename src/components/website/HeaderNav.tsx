"use client";

import { NAV_ITEMS } from "@/utils/utils";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

function HeaderNav() {
  const pathName = usePathname();

  return (
    <nav
      className={`flex gap-10 translate-x-20 ${
        pathName !== "/" ? "hidden" : "block"
      }`}
    >
      {NAV_ITEMS.map((navItem) => (
        <NavItem key={navItem.id} id={navItem.id}>
          {navItem.title}
        </NavItem>
      ))}
      {/* <NavItem id="home" active>
        صفحه اصلی
      </NavItem>
      <NavItem id="products">محصولات</NavItem>
      <NavItem id="about-us">درباره ما</NavItem>
      <NavItem id="contact-us">ارتباط با ما</NavItem>
      <NavItem id="faq">سوالات متداول</NavItem> */}
    </nav>
  );
}

export default HeaderNav;
