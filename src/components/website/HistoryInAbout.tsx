function HistoryInAbout() {
  return (
    <div className=" col-span-7 p-6  max-sm:p-4  rounded-lg border border-neutral-300 bg-neutral-100 flex flex-col gap-4 max-sm:gap-3  max-sm:col-span-full">
      <div className=" flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="32"
          // height="32"
          className=" size-8 max-sm:size-6"
          viewBox="0 0 32 32"
          fill="none"
        >
          <g clipPath="url(#clip0_228_246)">
            <path
              d="M15.049 2.92664C15.3483 2.00538 16.6517 2.00538 16.951 2.92664L19.368 10.3644C19.5019 10.7764 19.8858 11.0553 20.319 11.0553L28.1396 11.0556C29.1083 11.0556 29.5111 12.2952 28.7274 12.8646L22.4006 17.4617C22.0501 17.7163 21.9035 18.1676 22.0373 18.5796L24.4537 26.0176C24.753 26.9388 23.6986 27.7049 22.9149 27.1356L16.5878 22.539C16.2373 22.2844 15.7627 22.2844 15.4122 22.539L9.08508 27.1356C8.30138 27.7049 7.24695 26.9388 7.54626 26.0176L9.96267 18.5796C10.0965 18.1676 9.94988 17.7163 9.59942 17.4617L3.27261 12.8646C2.48894 12.2952 2.8917 11.0556 3.86038 11.0556L11.681 11.0553C12.1142 11.0553 12.4981 10.7764 12.632 10.3644L15.049 2.92664Z"
              stroke="#701C1C"
              strokeWidth="3"
            />
          </g>
          <defs>
            <clipPath id="clip0_228_246">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className=" text-h5_SB_desktop max-sm:text-h5_SB_mobile text-neutral-800">
          سابقه
        </p>
      </div>
      <div className=" text-neutral-500 font-medium text-lg max-sm:text-[0.87813rem] leading-[2.125rem] max-sm:leading-[130%] space-y-2">
        <p>
          گروه تجاری زرسازان از سال ۱۴۰۰ با شناسایی و نیاز سنجی بازار خودرو در
          کشور عزیزمان ایران، اقدام به فعالیت تخصصی در زمینه واردات خودروی خارجی
          نموده و هم اکنون شرکت زرسازان بهرو در زمينه واردات خودروی جانبازان
          مصوبه هیئت وزیران مشغول به فعالیت است.
        </p>
      </div>
    </div>
  );
}

export default HistoryInAbout;
