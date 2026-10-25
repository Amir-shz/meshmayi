"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { NAV_ITEMS, PHONE_NUMBER } from "@/utils/utils";
import LogoName from "./LogoName";
import MobileNavigation from "./MobileNavigation";
import useActiveSection from "@/hooks/useActiveSection";

export default function Header() {
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname);
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          href="/#home"
          aria-label="زرسازان بهرو، صفحه اصلی"
          className="site-logo"
        >
          <LogoName />
        </Link>
        <nav className="site-desktop-nav" aria-label="منوی اصلی">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={pathname === "/" ? "#" + item.id : "/#" + item.id}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="site-header-actions">
          <a
            className="header-contact"
            href={"tel:" + PHONE_NUMBER}
            aria-label="تماس با زرسازان بهرو"
          >
            <Phone size={17} />
            <span>تماس با ما</span>
          </a>
          <MobileNavigation activeSection={activeSection} />
        </div>
      </div>
    </header>
  );
}
