"use client";

import { NAV_ITEMS } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function FooterNav() {
  const pathName = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);

    if (section) {
      const yOffset = -100;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }

    history.pushState(null, "", `#${id}`);
  };

  return (
    <nav
      className={`p-1 rounded-lg border border-neutral-300 w-fit mx-auto ${
        pathName !== "/" ? "hidden" : "block"
      }`}
    >
      <ul className="flex justify-center gap-4 max-sm:gap-2 max-xs:gap-1 [&>li]:py-1 max-xs:[&>li]:px-2 [&>li]:px-3 [&>li]:rounded-lg">
        {NAV_ITEMS.filter((item) => item.id !== "products").map((navItem) => (
          <li
            key={navItem.id}
            className="hover:bg-primary-50 duration-300 max-sm:text-lb2_mobile"
          >
            <Link
              href={`#${navItem.id}`}
              onClick={(e) => handleClick(e, navItem.id)}
            >
              {navItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FooterNav;
