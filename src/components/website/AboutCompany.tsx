function AboutCompany() {
  return (
    <div className=" col-span-5 max-lg:col-span-full row-span-2 p-6 max-sm:p-4 rounded-lg border border-neutral-300 bg-neutral-100 flex flex-col gap-4 max-sm:gap-3 max-sm:col-span-full">
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
            d="M6.66667 4V9.33333M4 6.66667H9.33333M8 22.6667V28M5.33333 25.3333H10.6667M17.3333 4L20.381 13.1429L28 16L20.381 18.8571L17.3333 28L14.2857 18.8571L6.66667 16L14.2857 13.1429L17.3333 4Z"
            stroke="#701C1C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className=" text-h5_SB_desktop max-sm:text-h5_SB_mobile text-neutral-800">
          شرکت زرسازان بهرو
        </p>
      </div>
      <div className=" text-neutral-500 font-medium text-lg max-sm:text-[0.87813rem] leading-[2.125rem] max-sm:leading-[130%] space-y-2">
        <p>
          شرکت زرسازان بهرو، واردات کننده خودرو سواری خارجی خصوصا مصوبه‌ خودروی
          جانبازان معزز به مدیریت دکتر جمال مشمایی با سابقه درخشان و پایدار.
        </p>
        <p>
          {" "}
          گروه خودرویی زرسازان بهرو، با سال‌ها تجربه درخشان در صنعت خودرو، به
          عنوان یکی از معتبرترین واردکنندگان خودرو در ایران شناخته می‌شود. ما با
          تمرکز بر کیفیت و رضایت مشتری، خدمات جامعی در زمینه واردات انواع
          خودروهای سبک خارجی ارائه می‌دهیم.
        </p>
        <p>
          {" "}
          گروهی از متخصصان صنعت خودرو با مشاهده نیازهای روزافزون بازار ایران به
          خودروهای باکیفیت و خدمات پس از فروش مطمئن، تصمیم به تأسیس شرکت زرسازان
          بهرو گرفتند. هدف اصلی، پر کردن خلأ موجود در بازار واردات خودرو و ارائه
          خدمات استاندارد به مشتریان بود.
        </p>
      </div>
    </div>
  );
}

export default AboutCompany;
