import { digitsEnToFa } from "@persian-tools/persian-tools";

function CarOptions({ options }: { options: string[] }) {
  return (
    <div className=" max-sm:mt-2">
      <h3 className=" text-h5_SB_desktop max-sm:text-p2_SB_desktop text-neutral-800 mb-4 max-sm:mb-2">
        آپشن‌ها(امکانات)
      </h3>
      <div className=" flex gap-3 flex-wrap">
        {options.map((option: string, index: number) => (
          <p
            key={index}
            className=" px-5 max-sm:px-3 max-sm:py-[0.38rem] py-[0.62rem] rounded-lg border border-primary-200 bg-primary-50 text-primary-500 text-p2_M_desktop max-sm:text-p3_M_desktop leading-[1.23rem]"
          >
            {digitsEnToFa(option)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CarOptions;
