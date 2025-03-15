import Link from "next/link";

interface navItemProps {
  id: string;
  active?: boolean;
  children: React.ReactNode;
}

function NavItem({ id, active = false, children }: navItemProps) {
  return (
    <Link
      href={`#${id}`}
      className={`${
        active
          ? " text-primary-500 rounded-lg bg-primary-50 border-b-4 border-b-primary-500"
          : " text-neutral-600"
      } py-3 px-6 text-p1_SB_desktop leading-[1.35rem]`}
    >
      {children}
    </Link>
  );
}

export default NavItem;
