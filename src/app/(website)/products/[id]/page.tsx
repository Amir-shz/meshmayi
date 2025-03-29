import Slider from "@/components/Slider";
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
      <div className=" col-span-5 flex flex-col gap-8">
        <div className=" max-sm:hidden">
          <CarPictures pictures={pictures} />
        </div>
        <div className=" sm:hidden mb-3 overflow-hidden rounded-lg">
          <Slider pictures={pictures} />
        </div>
        <span className=" w-full h-[0.0625rem] bg-neutral-400 -mt-4 -mb-4 max-sm:hidden"></span>
        <div className="flex flex-col gap-8 max-sm:hidden">
          <CarColors colors={colors} />
          <CarPrice price={price} />
        </div>
      </div>
      <div className=" col-span-5 flex flex-col gap-8 max-sm:gap-4">
        <CarName name={name} model={model} />
        <div className=" sm:hidden mt-1 mb-2">
          <CarColors colors={colors} />
        </div>
        <CarSpecifications technicalSpecifications={technicalSpecifications} />
        <CarOptions options={options} />
        <CarDescriptions descriptions={descriptions} />
      </div>
      <span className=" col-span-5 w-full h-[0.0625rem] bg-neutral-200 mt-5 mb-5  sm:hidden"></span>

      <div className=" col-span-2 flex flex-col gap-8 max-sm:gap-3 max-sm:col-span-5">
        <BuyingAdvice />
        <Companion />
      </div>
      <CarPrice price={price} />
    </>
  );
}

export default CarPage;
