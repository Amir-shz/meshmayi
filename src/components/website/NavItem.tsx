import Link from "next/link";
import React from "react";

interface navItemProps {
  id: string;
  active?: boolean;
  children: React.ReactNode;
}

function NavItem({ id, active = false, children }: navItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <Link
      href={`#${id}`}
      onClick={handleClick}
      className={`${
        active
          ? " text-primary-500 rounded-lg bg-primary-50 border-b-4 border-b-primary-500"
          : " text-neutral-600"
      } py-3 px-6  text-p1_SB_desktop leading-[1.35rem] duration-200 max-sm:text-center`}
    >
      {children}
    </Link>
  );
}

export default NavItem;
