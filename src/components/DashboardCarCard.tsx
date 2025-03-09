import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Slider from "./Slider";
import DashboardCarCardBtns from "./DashboardCarCardBtns";

interface dashboardCarCardProps {
  id: string;
  name: string;
  price: number;
  model: number;
  pictures: { _id: string; src: string }[];
}

function DashboardCarCard({
  id,
  name,
  model,
  price,
  pictures,
}: dashboardCarCardProps) {
  return (
    <div className="w-full col-span-2 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100">
      <div className="h-[10.5rem] w-full ">
        <Slider pictures={pictures} />
      </div>
      <div className="m-3">
        <div>
          <p className=" text-p2_SB_desktop text-neutral-800">{name}</p>
          <p className=" text-neutral-500 text-p3_M_desktop mt-2">
            سال {model}
          </p>
          <p className=" text-p2_M_desktop text-neutral-800 mt-3">
            {digitsEnToFa(addCommas(price))}{" "}
            <span className=" text-p4_M_desktop text-neutral-400">تومان</span>
          </p>
        </div>
        <DashboardCarCardBtns id={id} />
      </div>
    </div>
  );
}

export default DashboardCarCard;
