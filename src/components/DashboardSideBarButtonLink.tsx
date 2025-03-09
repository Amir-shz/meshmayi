import Link from "next/link";
import { ReactNode } from "react";

interface dashboardSideBarButtonLinkprops {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

function DashboardSideBarButtonLink({
  href,
  icon,
  children,
}: dashboardSideBarButtonLinkprops) {
  return (
    <Link
      href={href}
      className="h-12 py-[0.62rem] text-p2_M_desktop leading-[1.23rem] [&>svg]:size-5 flex gap-3 w-full rounded-lg bg-primary-50 justify-center items-center text-primary-500"
    >
      <p>{children}</p>
      {icon}
    </Link>
  );
}

export default DashboardSideBarButtonLink;
