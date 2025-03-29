import { digitsEnToFa } from "@persian-tools/persian-tools";

function CarDescriptions({ descriptions }: { descriptions: string[] }) {
  return (
    <div className=" max-sm:mt-2">
      <h3 className=" text-h5_SB_desktop max-sm:text-p2_SB_desktop text-neutral-800 mb-4">
        توضیحات
      </h3>
      <div className=" flex flex-col gap-3 max-sm:gap-2">
        {descriptions.map((description: string, index: number) => (
          <div
            key={index}
            className=" p-6 max-sm:p-4 rounded-lg border border-neutral-300 bg-neutral-100 flex flex-col gap-4 max-sm:gap-3"
          >
            <div className=" flex items-center gap-2 max-sm:gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // width="32"
                // height="32"
                viewBox="0 0 32 32"
                fill="none"
                className=" size-8 max-sm:size-6"
              >
                <path
                  d="M17.3333 21.3333H16V16H14.6667M16 10.6667H16.0133M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
                  stroke="#701C1C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className=" text-h5_SB_desktop max-sm:text-h5_SB_mobile max-sm:leading-5 leading-8 text-neutral-800">
                توضیحات
              </p>
            </div>
            <p className=" text-neutral-500 font-medium leading-[1.375rem] text-base max-sm:text-sm max-sm:leading-[1.1375rem]">
              {digitsEnToFa(description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarDescriptions;
