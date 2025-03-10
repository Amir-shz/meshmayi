import Button from "@/components/Button";
import EditCarForm from "@/features/car/EditCarForm";
import { editCar } from "@/lib/actions/car";
import { HiOutlineSave } from "react-icons/hi";

export const revalidate = 0;

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const car = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/car/${id}`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <form
      action={editCar}
      className="col-span-full items-start h-full rounded-2xl bg-neutral-100 border border-neutral-300 "
    >
      <input type="hidden" name="id" defaultValue={car._id} />
      <div className=" border-b border-neutral-300 col-span-full p-8 flex justify-between items-center">
        <p className=" text-h4_B_desktop text-neutral-700 leading-8">
          ویرایش محصول
        </p>
        <Button size="big" type="filled" icon={<HiOutlineSave />} submit>
          ذخیره تغییرات
        </Button>
      </div>
      <EditCarForm car={car} />
    </form>
  );
}

export default page;
