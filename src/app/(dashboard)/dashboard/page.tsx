import DashboardCarCard from "@/components/DashboardCarCard";

function DashboardPage() {
  return (
    <div className="col-span-full grid grid-cols-3 gap-4 m-2 items-start">
      <DashboardCarCard />
      <DashboardCarCard />
      <DashboardCarCard />
    </div>
  );
}

export default DashboardPage;
