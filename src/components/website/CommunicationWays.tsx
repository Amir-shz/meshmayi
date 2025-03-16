import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

function CommunicationWays() {
  return (
    <div className=" p-6 pb-5 rounded-lg border border-neutral-300 bg-neutral-100 flex flex-col gap-5">
      <div className=" flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M17.3333 13.3333V4L5.33331 18.6667H14.6666L14.6666 28L26.6666 13.3333L17.3333 13.3333Z"
            stroke="#701C1C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className=" text-h5_SB_desktop text-neutral-800">راه‌های‌ ارتباطی</p>
      </div>
      <div className=" p-4 rounded-lg border border-neutral-300 flex items-center justify-between flex-wrap  ">
        <div className=" flex items-center gap-1 py-3 px-6 hover:bg-primary-50 duration-300 hover:border-primary-200 border border-neutral-100 rounded-lg ">
          <p className=" text-h5_B_desktop text-neutral-500">۰۹۱۳۲۳۴۵۶۷۸</p>
          <HiOutlinePhone className=" size-14 m-4 text-neutral-500" />
        </div>
        <div className=" flex items-center gap-1 py-3 px-6 hover:bg-primary-50 duration-300 hover:border-primary-200 border border-neutral-100 rounded-lg">
          <p className=" text-h5_B_desktop text-neutral-500">omid@gmail.com</p>
          <HiOutlineMail className=" size-14 m-4 text-neutral-500" />
        </div>
      </div>
    </div>
  );
}

export default CommunicationWays;
