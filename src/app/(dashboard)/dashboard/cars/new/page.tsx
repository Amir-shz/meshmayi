import Button from "@/components/Button";
import EditCarForm from "@/features/car/EditCarForm";
import { createCar } from "@/lib/actions/car";
import { HiOutlineSave } from "react-icons/hi";

export const revalidate = 0;

function page() {
  return (
    <form
      action={createCar}
      className="col-span-full items-start h-full rounded-2xl bg-neutral-100 border border-neutral-300 "
    >
      <div className=" border-b border-neutral-300 col-span-full p-8 flex justify-between items-center">
        <p className=" text-h4_B_desktop text-neutral-700 leading-8">
          ایجاد محصول
        </p>
        <Button size="big" type="filled" icon={<HiOutlineSave />} submit>
          ایجاد محصول
        </Button>
      </div>

      <EditCarForm
        car={{
          name: "",
          price: 0,
          model: 0,
          colors: "",
          descriptions: [],
          options: [],
          technicalSpecifications: [],
          pictures: [],
        }}
      />
    </form>
  );
}

export default page;
