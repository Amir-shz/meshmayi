import Breadcrumbs from "@/components/website/Breadcrumbs";
import BuyingAdvice from "@/components/website/BuyingAdvice";
import CarColors from "@/components/website/CarColors";
import CarDescriptions from "@/components/website/CarDescriptions";
import CarName from "@/components/website/CarName";
import CarOptions from "@/components/website/CarOptions";
import CarPictures from "@/components/website/CarPictures";
import CarPrice from "@/components/website/CarPrice";
import CarSpecifications from "@/components/website/CarSpecifications";
import Companion from "@/components/website/Companion";

async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const {
    name,
    price,
    model,
    pictures,
    options,
    technicalSpecifications,
    descriptions,
    colors,
  } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/car/${id}`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <>
      <Breadcrumbs name={name} />
      <div className=" col-span-5  flex flex-col gap-8">
        <CarPictures pictures={pictures} />
        <CarColors colors={colors} />
        <CarPrice price={price} />
      </div>
      <div className=" col-span-5 flex flex-col gap-8">
        <CarName name={name} model={model} />
        <CarSpecifications technicalSpecifications={technicalSpecifications} />
        <CarOptions options={options} />
        <CarDescriptions descriptions={descriptions} />
      </div>
      <div className=" col-span-2 flex flex-col gap-8">
        <BuyingAdvice />
        <Companion />
      </div>
    </>
  );
}

export default CarPage;
