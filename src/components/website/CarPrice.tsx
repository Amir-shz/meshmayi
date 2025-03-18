import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

function CarPrice({ price }: { price: string }) {
  return (
    <div className="p-5 border border-neutral-300 bg-neutral-100 rounded flex items-center justify-between">
      <p className=" text-neutral-700 font-bold leading-8 text-[1.8rem]">
        قیمت:
      </p>
      <p className=" flex gap-2 items-center">
        <span className=" text-primary-500 font-bold leading-8 text-[1.8rem] ">
          {digitsEnToFa(addCommas(price))}
        </span>
        <span className=" text-p2_M_desktop text-primary-300">تومان</span>
      </p>
    </div>
  );
}

export default CarPrice;
