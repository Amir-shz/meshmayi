"use client";

import { NAV_ITEMS } from "@/utils/utils";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function HeaderNav() {
  const pathName = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let maxPercentage = 0;
      let currentMostVisible = null;

      NAV_ITEMS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.max(
            0,
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
          );
          const percentage = (visibleHeight / window.innerHeight) * 100;

          if (percentage > maxPercentage) {
            maxPercentage = percentage;
            currentMostVisible = id;
          }
        }
      });

      setActiveSection(currentMostVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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
