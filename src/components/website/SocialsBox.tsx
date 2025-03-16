import Link from "next/link";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import TelegramIcon from "../icons/TelegramIcon";
import WhatsappIcon from "../icons/WhatsappIcon";

function SocialsBox() {
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
            d="M21.3333 16C21.3333 13.0545 18.9455 10.6667 16 10.6667C13.0545 10.6667 10.6667 13.0545 10.6667 16C10.6667 18.9455 13.0545 21.3333 16 21.3333C18.9455 21.3333 21.3333 18.9455 21.3333 16ZM21.3333 16V18C21.3333 19.841 22.8257 21.3333 24.6667 21.3333C26.5076 21.3333 28 19.841 28 18V16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28M22 26.3923C20.1067 27.4854 18.0394 28.0039 15.9999 28.002"
            stroke="#701C1C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className=" text-h5_SB_desktop text-neutral-800">شبکه‌های اجتماعی</p>
      </div>
      <div className=" py-3 px-10 rounded-lg border border-neutral-300 grid grid-cols-4 justify-items-center [&>a]:px-8 [&>a]:py-7 [&>a:hover]:bg-primary-50 [&>a]:rounded-lg [&>a]:border [&>a]:border-neutral-100 [&>a:hover]:border-primary-200 [&>a]:duration-300">
        <Link
          className="[&_path]:hover:fill-primary-500 [&_path]:duration-300"
          href=""
        >
          <TelegramIcon />
        </Link>
        <Link
          className="[&_path]:hover:fill-primary-500 [&_path]:duration-300"
          href=""
        >
          <WhatsappIcon />
        </Link>
        <Link
          className="[&_path]:hover:fill-primary-500 [&_path]:duration-300"
          href=""
        >
          <InstagramIcon />
        </Link>
        <Link
          className="[&_path]:hover:fill-primary-500 [&_path]:duration-300"
          href=""
        >
          <LinkedinIcon />
        </Link>
      </div>
    </div>
  );
}

export default SocialsBox;
