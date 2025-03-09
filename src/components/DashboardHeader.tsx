"use client";

import { logout } from "@/lib/actions/auth";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineChevronRight, HiOutlineLogout } from "react-icons/hi";

function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className=" h-24 flex justify-between items-center py-6 w-full">
      <button
        onClick={() => router.back()}
        className={`size-12 p-3 [&>svg]:size-6 bg-neutral-100 border border-neutral-300 flex justify-center items-center text-neutral-700 rounded-full hover:bg-neutral-200 duration-300 ${
          pathname === "/dashboard" && "invisible"
        } `}
      >
        <HiOutlineChevronRight />
      </button>
      <button
        className=" size-12 p-3 [&>svg]:size-6 bg-red-50 border border-red-200 flex justify-center items-center text-red-600 rounded-full hover:bg-red-100 duration-300"
        onClick={logout}
      >
        <HiOutlineLogout />
      </button>
    </header>
  );
}

export default DashboardHeader;
