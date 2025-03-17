import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { COLORS } from "@/utils/utils";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Link from "next/link";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const {
    name,
    price,
    model,
    // pictures,
    options,
    technicalSpecifications,
    descriptions,
    colors,
  } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/car/${id}`)
    .then((res) => res.json())
    .then((data) => data.data);

  console.log(technicalSpecifications);

  return (
    <>
      <div className=" col-span-full text-p2_M_desktop text-neutral-500 py-7 mb-6">
        <Link href={`/`} className="hover:text-neutral-800 duration-300">
          صفحه اصلی
        </Link>
        <span> / </span>
        <Link
          href={`/products`}
          className="hover:text-neutral-800 duration-300"
        >
          محصولات
        </Link>
        <span> / </span>
        <p className=" inline">{digitsEnToFa(name)}</p>
      </div>
      <div className=" col-span-5  flex flex-col gap-8">
        <div className=" bg-primary-50 h-96"></div>
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
        <div className="p-5 border border-neutral-300 bg-neutral-100 rounded flex items-center justify-between">
          <p className=" text-neutral-700 font-bold leading-8 text-[1.8rem]">
            قیمت:
          </p>
          <p className=" flex gap-2 items-center">
            <span className=" text-primary-500 font-bold leading-8 text-[1.8rem] ">
              {digitsEnToFa(addCommas(price))}
            </span>
            <span className=" text-p2_M_desktop text-primary-300">تومان</span>
          </p>
        </div>
      </div>
      <div className=" col-span-5 flex flex-col gap-8">
        <h2 className=" text-neutral-800 font-bold leading-8 text-[1.6rem]">
          <span>{digitsEnToFa(name)}</span>
          <span> - </span>
          <span>{digitsEnToFa(model)}</span>
        </h2>
        <div>
          <h3 className=" text-h5_SB_desktop text-neutral-800 mb-4">
            مشخصات فنی
          </h3>
          <div className=" grid grid-cols-3 gap-3">
            {technicalSpecifications.map(
              (technicalSpecification: {
                label: string;
                description: string;
                _id: string;
              }) => (
                <div
                  key={technicalSpecification._id}
                  className=" p-4 flex flex-col gap-4 rounded-lg bg-neutral-100 border border-neutral-300"
                >
                  <p className=" text-p1_SB_desktop text-neutral-800">
                    {digitsEnToFa(technicalSpecification.label)}
                  </p>
                  <p className=" text-p2_M_desktop text-neutral-500">
                    {digitsEnToFa(technicalSpecification.description)}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
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
        <div>
          <h3 className=" text-h5_SB_desktop text-neutral-800 mb-4">توضیحات</h3>
          {descriptions.map((description: string, index: number) => (
            <div
              key={index}
              className=" p-6 rounded-lg border border-neutral-300 bg-neutral-100 flex flex-col gap-4"
            >
              <div className=" flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M17.3333 21.3333H16V16H14.6667M16 10.6667H16.0133M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
                    stroke="#701C1C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className=" text-h5_SB_desktop leading-8 text-neutral-800">
                  توضیحات
                </p>
              </div>
              <p className=" text-neutral-500 font-medium leading-[1.375rem] text-base">
                {digitsEnToFa(description)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className=" col-span-2 flex flex-col gap-8">
        <div className=" p-4 flex flex-col gap-4 rounded-lg border border-neutral-300 bg-neutral-100">
          <div className=" flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M12.8846 22.6667H19.1152M15.9999 4V5.33333M24.4852 7.51472L23.5424 8.45753M28 15.9999H26.6667M5.33333 15.9999H4M8.45746 8.45753L7.51465 7.51472M11.2859 20.7141C8.68239 18.1106 8.68239 13.8895 11.2859 11.286C13.8894 8.68249 18.1105 8.68249 20.714 11.286C23.3175 13.8895 23.3175 18.1106 20.714 20.7141L19.9845 21.4435C19.1407 22.2874 18.6666 23.4319 18.6666 24.6253V25.3333C18.6666 26.8061 17.4727 28 15.9999 28C14.5272 28 13.3333 26.8061 13.3333 25.3333V24.6253C13.3333 23.4319 12.8592 22.2874 12.0153 21.4435L11.2859 20.7141Z"
                stroke="#701C1C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className=" text-h5_SB_desktop text-neutral-800 leading-8">
              مشاوره خرید
            </p>
          </div>
          <ul className=" text-neutral-500 leading-[2.125rem] font-medium text-sm [&>li]:flex [&>li]:gap-1 [&_span:first-child]:text-4xl [&_span:first-child]:leading-6">
            <li>
              <span>.</span>
              <span>مشاوره درباره روش خرید</span>
            </li>
            <li>
              <span>.</span>
              <span>مشاوره درباره قیمت‌ها</span>
            </li>
            <li>
              <span>.</span>
              <span>مشاوره درباره نحوه پرداخت</span>
            </li>
            <li>
              <span>.</span>
              <span>همراه شما تا خرید</span>
            </li>
          </ul>
          <div className=" flex items-center gap-4 justify-center [&_svg]:size-10 [&_svg]:text-neutral-500 [&_svg]:m-1">
            <Link href="#">
              <HiOutlinePhone />
            </Link>
            <Link href="#">
              <HiOutlineMail />
            </Link>
            <Link href="#">
              <WhatsappIcon />
            </Link>
          </div>
        </div>
        <div className=" p-4 flex flex-col gap-4 rounded-lg border border-neutral-300 bg-neutral-100">
          <div className=" flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M5.75736 8.42405C3.41421 10.7672 3.41421 14.5662 5.75736 16.9093L16.0001 27.152L26.2426 16.9093C28.5858 14.5662 28.5858 10.7672 26.2426 8.42405C23.8995 6.0809 20.1005 6.0809 17.7574 8.42405L16.0001 10.1815L14.2426 8.42405C11.8995 6.0809 8.10051 6.0809 5.75736 8.42405Z"
                stroke="#701C1C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className=" text-h5_SB_desktop text-neutral-800 leading-8">
              همراه
            </p>
          </div>
          <p className=" text-neutral-500 text-base font-medium leading-8">
            سفر جدیدی را آغاز کنید... بهترین گزینه‌ها را برای بهترین‌ها فراهم
            کردیم، هر آنچه که نیاز دارید. همراهی مطمئن با شما، تجربه‌ای جدید از
            خرید خودرو
          </p>
        </div>
      </div>
    </>
  );
}

export default CarPage;
