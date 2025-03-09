import Button from "@/components/Button";
import DashboardCarCard from "@/components/DashboardCarCard";
import { HiPlus } from "react-icons/hi";

function DashboardPage() {
  return (
    <div className="col-span-full items-start h-full rounded-2xl bg-neutral-100 border border-neutral-300 ">
      <div className=" border-b border-neutral-300 col-span-full p-8 flex justify-between items-center">
        <p className=" text-h4_B_desktop text-neutral-700 leading-8">محصولات</p>
        <Button size="big" type="filled" icon={<HiPlus />}>
          افزودن محصول
        </Button>
      </div>
      <div className=" grid grid-cols-6 gap-8 px-8 overflow-y-scroll max-h-full pt-8 pb-28 hide-scrollbar">
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
        <DashboardCarCard />
      </div>
    </div>
  );
}

export default DashboardPage;
