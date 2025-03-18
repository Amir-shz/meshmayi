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
      className={`flex gap-10 2xl:translate-x-20 max-lg:hidden xl:translate-x-10 max-xl:gap-4 max-lg:gap-2 ${
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
    </nav>
  );
}

export default HeaderNav;
