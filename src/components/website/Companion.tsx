function Companion() {
  return (
    <div className=" p-4 flex flex-col gap-4 rounded-lg border border-neutral-300 bg-neutral-100">
      <div className=" flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          className=" size-8 max-sm:size-6"
        >
          <path
            d="M5.75736 8.42405C3.41421 10.7672 3.41421 14.5662 5.75736 16.9093L16.0001 27.152L26.2426 16.9093C28.5858 14.5662 28.5858 10.7672 26.2426 8.42405C23.8995 6.0809 20.1005 6.0809 17.7574 8.42405L16.0001 10.1815L14.2426 8.42405C11.8995 6.0809 8.10051 6.0809 5.75736 8.42405Z"
            stroke="#701C1C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className=" text-h5_SB_desktop max-sm:text-h5_SB_mobile text-neutral-800 leading-8">
          همراه
        </p>
      </div>
      <p className=" text-neutral-500 text-base font-medium leading-8">
        سفر جدیدی را آغاز کنید... بهترین گزینه‌ها را برای بهترین‌ها فراهم کردیم،
        هر آنچه که نیاز دارید. همراهی مطمئن با شما، تجربه‌ای جدید از خرید خودرو
      </p>
    </div>
  );
}

export default Companion;
