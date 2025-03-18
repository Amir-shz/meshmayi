import { digitsEnToFa } from "@persian-tools/persian-tools";

function CarOptions({ options }: { options: string[] }) {
  return (
    <div>
      <h3 className=" text-h5_SB_desktop text-neutral-800 mb-4">
        آپشن‌ها(امکانات)
      </h3>
      <div className=" flex gap-3 flex-wrap">
        {options.map((option: string, index: number) => (
          <p
            key={index}
            className=" px-5 py-[0.62rem] rounded-lg border border-primary-200 bg-primary-50 text-primary-500 text-p2_M_desktop leading-[1.23rem]"
          >
            {digitsEnToFa(option)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CarOptions;
