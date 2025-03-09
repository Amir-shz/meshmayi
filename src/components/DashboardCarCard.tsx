import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Slider from "./Slider";
import Button from "./Button";
import { HiOutlinePencil, HiTrash } from "react-icons/hi";

function DashboardCarCard() {
  return (
    <div className="w-full col-span-2 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100">
      <div className="h-[10.5rem] w-full ">
        <Slider />
      </div>
      <div className="m-3">
        <div>
          <p className=" text-p2_SB_desktop text-neutral-800">
            پورشه 911 Turbo S
          </p>
          <p className=" text-neutral-500 text-p3_M_desktop mt-2">سال 2020</p>
          <p className=" text-p2_M_desktop text-neutral-800 mt-3">
            {digitsEnToFa(addCommas(30000000))}{" "}
            <span className=" text-p4_M_desktop text-neutral-400">تومان</span>
          </p>
        </div>
        <div className="mt-4 flex gap-4 justify-end">
          <Button size="small" type="delete" icon={<HiTrash />}>
            حذف
          </Button>

          <Button size="small" icon={<HiOutlinePencil />}>
            ویرایش
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardCarCard;
