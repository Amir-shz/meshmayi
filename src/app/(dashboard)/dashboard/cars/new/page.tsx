import EditCarForm from "@/features/car/EditCarForm";
import { createCar } from "@/lib/actions/car";

export const revalidate = 0;

function page() {
  return (
    <EditCarForm
      car={{
        name: "",
        price: 0,
        model: 0,
        colors: [],
        descriptions: [],
        options: [],
        technicalSpecifications: [],
        pictures: [],
      }}
      action={createCar}
      title="ایجاد محصول"
      btnText="ایجاد محصول"
    />
  );
}

export default page;
