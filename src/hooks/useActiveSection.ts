"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/utils/utils";
import { getActiveSection } from "@/lib/navigation";

export default function useActiveSection(pathname: string) {
  const [active, setActive] = useState<string | null>("home");

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    function update() {
      frame = 0;
      const headerBottom =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 88;
      const sections = NAV_ITEMS.flatMap(({ id }) => {
        const section = document.getElementById(id);
        return section
          ? [{ id, top: section.getBoundingClientRect().top }]
          : [];
      });
      setActive(
        getActiveSection(
          sections,
          headerBottom + Math.min(120, innerHeight * 0.2),
        ),
      );
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return pathname === "/"
    ? active
    : pathname.startsWith("/products")
      ? "products"
      : null;
}
