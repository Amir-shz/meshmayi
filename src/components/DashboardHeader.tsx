"use client";

import LogoutButton from "@/features/auth/LogoutButton";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineChevronRight } from "react-icons/hi";

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
      <LogoutButton />
    </header>
  );
}

export default DashboardHeader;
