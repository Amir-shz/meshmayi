import MapLocation from "./MapLocation";

function LocationInAbout() {
  return (
    <div className=" col-span-7 max-lg:col-span-6 p-6  max-sm:p-4 rounded-lg border border-neutral-300 bg-neutral-100 max-sm:col-span-full">
      <div className="text-neutral-500 font-medium text-lg leading-[2.125rem] max-sm:leading-[130%] max-sm:text-[0.87813rem] flex items-center h-full gap-6 max-sm:flex-col max-sm:gap-3">
        <div className=" basis-1/2 space-y-4 self-start max-sm:space-y-3 max-sm:basis-auto ">
          <div className=" flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="32"
              // height="32"
              className=" size-8 max-sm:size-6"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M23.5425 22.2091C22.1791 23.5725 19.1914 26.5602 17.4127 28.3389C16.6317 29.12 15.3687 29.1203 14.5876 28.3392C12.8387 26.5903 9.91312 23.6647 8.45757 22.2091C4.29198 18.0435 4.29198 11.2898 8.45757 7.12419C12.6232 2.9586 19.3769 2.9586 23.5425 7.12419C27.7081 11.2898 27.7081 18.0435 23.5425 22.2091Z"
                stroke="#701C1C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 14.6667C20 16.8758 18.2092 18.6667 16 18.6667C13.7909 18.6667 12 16.8758 12 14.6667C12 12.4575 13.7909 10.6667 16 10.6667C18.2092 10.6667 20 12.4575 20 14.6667Z"
                stroke="#701C1C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className=" text-h5_SB_desktop max-sm:text-h5_SB_mobile text-neutral-800">
              آدرس و لوکیشن
            </p>
          </div>
          <p>
            منطقه آزاد ماکو، شهر بازرگان، خیابان امام، پلاک ۱۰۹۶، طبقه اول، شرکت
            زرسازان بهرو
          </p>
        </div>
        <div className=" basis-1/2 h-full rounded-lg overflow-hidden border border-neutral-300 max-sm:w-full max-sm:basis-auto max-sm:h-24">
          <MapLocation />
        </div>
      </div>
    </div>
  );
}

export default LocationInAbout;
