import { HiViewGrid } from "react-icons/hi";
import DashboardSideBarButtonLink from "./DashboardSideBarButtonLink";
import Logo from "./Logo";

function DashboardSideBar() {
  return (
    <aside className=" col-span-3 bg-primary-500 rounded-e-3xl">
      <div className="mr-8 mt-8 flex items-center gap-4">
        <Logo />
        <p className=" text-h6_B_desktop text-neutral-50">زرسازان بهرو</p>
      </div>
      <div className="mx-8 mt-12">
        <DashboardSideBarButtonLink
          href="/dashboard/cars"
          icon={<HiViewGrid />}
        >
          صفحه محصولات
        </DashboardSideBarButtonLink>
      </div>
    </aside>
  );
}

export default DashboardSideBar;
