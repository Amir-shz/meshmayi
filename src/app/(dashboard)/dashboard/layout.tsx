import DashboardHeader from "@/components/DashboardHeader";
import DashboardSideBar from "@/components/DashboardSideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "داشبورد",
};

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardSideBar />
      <div className="col-span-9 pl-16 pr-8 flex flex-col gap-8">
        <DashboardHeader />
        <section className="h-[calc(100dvh-8rem-4px)] overflow-hidden mb-1">
          {children}
        </section>
      </div>
    </>
  );
}

export default layout;
