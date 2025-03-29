import { COLORS } from "@/utils/utils";

function CarColors({ colors }: { colors: string[] }) {
  return (
    <div className=" flex flex-col max-sm:flex-row max-sm:items-center max-sm:gap-3">
      <h3 className=" text-h5_SB_desktop text-neutral-800 mb-3 max-sm:text-h5_SB_mobile max-sm:mb-0">
        رنگ ها:
      </h3>
      <div className="flex items-center gap-5 flex-wrap max-sm:gap-3">
        {colors.map((color: string, index: number) => (
          <div
            key={index}
            style={{
              backgroundColor: `#${
                COLORS.find((item) => item.value === color)?.code
              }`,
            }}
            className={` size-16 max-sm:size-8 rounded-lg border-2 max-sm:border border-neutral-300`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default CarColors;
