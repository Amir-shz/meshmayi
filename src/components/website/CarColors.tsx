import { COLORS } from "@/utils/utils";

function CarColors({ colors }: { colors: string[] }) {
  return (
    <div>
      <h3 className=" text-h5_SB_desktop text-neutral-800 mb-3">رنگ ها:</h3>
      <div className="flex items-center gap-5 flex-wrap">
        {colors.map((color: string, index: number) => (
          <div
            key={index}
            style={{
              backgroundColor: `#${
                COLORS.find((item) => item.value === color)?.code
              }`,
            }}
            className={` size-16 rounded-lg border-2 border-neutral-300`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default CarColors;
