"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineArrowSmRight, HiOutlineMenu } from "react-icons/hi";
import IconButton from "../IconButton";

function HeaderBtn() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className=" sm:hidden flex items-center justify-center">
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
  );
}

export default HeaderBtn;
