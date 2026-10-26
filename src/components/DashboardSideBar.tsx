import { HiViewGrid } from "react-icons/hi";
import DashboardSideBarButtonLink from "./DashboardSideBarButtonLink";
import Logo from "./Logo";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";

function DashboardSideBar() {
  return (
    <aside className=" col-span-3 bg-primary-500 rounded-e-3xl">
      <Link href="/" className="mr-8 mt-8 flex items-center gap-4 w-fit">
        <Logo />
        <p className=" text-h6_B_desktop text-neutral-50">زرسازان بهرو</p>
      </Link>
      <div className="mx-8 mt-12 flex flex-col gap-3">
        <DashboardSideBarButtonLink
          href="/dashboard/cars"
          icon={<HiViewGrid />}
        >
          صفحه محصولات
        </DashboardSideBarButtonLink>
        <DashboardSideBarButtonLink href="/dashboard/blog" icon={<MessageSquareText />}>مدیریت بلاگ</DashboardSideBarButtonLink>
        <DashboardSideBarButtonLink href="/dashboard/blog/comments" icon={<MessageSquareText />}>دیدگاه‌های بلاگ</DashboardSideBarButtonLink>
        <DashboardSideBarButtonLink href="/dashboard/comments" icon={<MessageSquareText />}>
          مدیریت دیدگاه‌ها
        </DashboardSideBarButtonLink>
      </div>
    </aside>
  );
}

export default DashboardSideBar;
