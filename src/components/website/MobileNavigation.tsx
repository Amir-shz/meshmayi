"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/utils/utils";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

export default function MobileNavigation({
  activeSection,
}: {
  activeSection: string | null;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer
      direction="top"
      open={open}
      onOpenChange={setOpen}
      shouldScaleBackground={false}
    >
      <DrawerTrigger asChild>
        <button className="mobile-menu-trigger" aria-label="باز کردن منوی اصلی">
          <Menu size={23} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="mobile-design-menu" dir="rtl">
        <div className="mobile-menu-heading">
          <div>
            <DrawerTitle>زرسازان بهرو</DrawerTitle>
            <DrawerDescription>مسیر تازه، انتخاب متمایز</DrawerDescription>
          </div>
          <DrawerClose asChild>
            <button className="mobile-menu-close" aria-label="بستن منوی اصلی">
              <X size={22} />
            </button>
          </DrawerClose>
        </div>
        <nav aria-label="منوی موبایل">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={"/#" + item.id}
              onClick={() => setOpen(false)}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
