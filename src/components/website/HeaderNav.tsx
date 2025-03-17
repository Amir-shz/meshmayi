"use client";

import { NAV_ITEMS } from "@/utils/utils";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function HeaderNav() {
  const pathName = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        // rootMargin: "-100px",
        threshold: 0,
      }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`flex gap-10 translate-x-20 max-sm:hidden ${
        pathName !== "/" ? "hidden" : "block"
      }`}
    >
      {NAV_ITEMS.map((navItem) => (
        <NavItem
          key={navItem.id}
          id={navItem.id}
          active={activeSection === navItem.id}
        >
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
