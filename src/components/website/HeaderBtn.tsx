"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineArrowSmRight, HiOutlineMenu, HiX } from "react-icons/hi";
import IconButton from "../IconButton";

import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "../ui/drawer";

import { NAV_ITEMS } from "@/utils/utils";
import NavItem from "./NavItem";

function HeaderBtn() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className=" lg:hidden flex items-center justify-center">
        {pathName === "/" ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <HiOutlineMenu className=" size-6" />
          </button>
        ) : (
          <IconButton size="lg" onClick={() => router.back()}>
            <HiOutlineArrowSmRight />
          </IconButton>
        )}
      </div>

      {/* mobile menu */}
      <div className="sm:hidden">
        <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger aria-label="menu"></DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay className="fixed inset-0 bg-neutral-50/5">
              <DrawerContent className="top-0 w-[96dvw] mx-auto h-min mt-0 rounded-b-lg rounded-t-none [&>div:first-child]:hidden bg-neutral-100 border border-t-0 border-primary-300 shadow-[0px_4px_8px_0px_rgba(23,23,23,0.08)]">
                <DialogTitle></DialogTitle>
                <div className="flex justify-between items-center mx-3 mt-6">
                  <button
                    className="[&>svg]:size-6"
                    onClick={() => setIsOpen(false)}
                  >
                    <HiX />
                  </button>
                </div>
                <div className=" w-max flex flex-col mx-auto -mt-4 mb-6">
                  {NAV_ITEMS.filter((el) => el.id !== "home")
                    .reverse()
                    .map((navItem) => (
                      <button
                        key={navItem.id}
                        className=" py-3 px-6"
                        onClick={() => setIsOpen(false)}
                      >
                        <NavItem id={navItem.id}>{navItem.title}</NavItem>
                      </button>
                    ))}
                </div>
              </DrawerContent>
            </DrawerOverlay>
          </DrawerPortal>
        </Drawer>
      </div>
    </>
  );
}

export default HeaderBtn;
