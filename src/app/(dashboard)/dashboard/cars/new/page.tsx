import EditCarForm from "@/features/car/EditCarForm";
import { createCar } from "@/lib/actions/car";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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
        labels: [],
      }}
      action={createCar}
      title="ایجاد محصول"
      btnText="ایجاد محصول"
    />
  );
}

export default page;
