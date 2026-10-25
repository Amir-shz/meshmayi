"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/utils/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mobile-menu-trigger" aria-label="باز کردن منوی اصلی">
          <Menu size={23} />
        </button>
      </DialogTrigger>
      <DialogContent className="mobile-design-menu">
        <DialogTitle>زرسازان بهرو</DialogTitle>
        <DialogDescription>مسیر تازه، انتخاب متمایز</DialogDescription>
        <nav aria-label="منوی موبایل">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={"/#" + item.id}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
