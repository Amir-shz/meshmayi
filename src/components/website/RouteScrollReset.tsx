"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollReset() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const historyNavigation = useRef(false);

  useEffect(() => {
    function onPopState() {
      historyNavigation.current = window.location.pathname !== previousPath.current;
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const restoreHistory = historyNavigation.current;
    historyNavigation.current = false;
    if (restoreHistory || window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
