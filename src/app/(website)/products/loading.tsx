import SectionsHeader from "@/components/website/SectionsHeader";

export default function Loading() {
  return (
    // <div className=" col-span-full  h-[calc(100dvh-18rem)] max-sm:h-[calc(100dvh-12rem)]  flex justify-center items-center">
    //   <div className="spinner"></div>
    // </div>
    <>
      <div className=" col-span-full">
        <SectionsHeader title="محصولات" />
      </div>
      <div className=" col-span-full grid grid-cols-1 sm:grid-cols-2 min-[850px]:grid-cols-3  gap-3 lg:gap-8 md:gap-6 [&>div]:h-[400px] [&>div]:bg-neutral-200 [&>div]:animate-pulse [&>div]:rounded-lg">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
