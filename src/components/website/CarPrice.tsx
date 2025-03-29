import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

function CarPrice({ price }: { price: string }) {
  return (
    <div className=" max-sm:fixed max-sm:bottom-0 max-sm:z-50 max-sm:w-full max-sm:-mx-4 max-sm:rounded-none p-5 max-sm:px-4 max-sm:py-[1.38rem] border border-neutral-300 bg-neutral-100 rounded flex items-center justify-between">
      <p className=" text-neutral-700 font-bold leading-8 text-[1.8rem] max-sm:text-p2_SB_mobile">
        قیمت:
      </p>
      <p className=" flex gap-2 items-center max-sm:gap-1">
        <span className=" text-primary-500 font-bold leading-8 text-[1.8rem] max-sm:text-h6_B_mobile ">
          {digitsEnToFa(addCommas(price))}
        </span>
        <span className=" text-p2_M_desktop text-primary-300 max-sm:text-lb2_mobile">
          تومان
        </span>
      </p>
    </div>
  );
}

export default CarPrice;
