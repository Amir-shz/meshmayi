import EditCarForm from "@/features/car/EditCarForm";
import { editCar } from "@/lib/actions/car";

export const revalidate = 0;

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const car = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/car/${id}`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <EditCarForm
      car={car}
      action={editCar}
      title="ویرایش محصول"
      btnText="ذخیره تغییرات"
    />
  );
}

export default page;
