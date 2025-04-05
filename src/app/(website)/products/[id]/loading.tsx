export default function Loading() {
  return (
    <>
      <div className=" col-span-full h-[calc(100dvh-18rem)] max-sm:h-[calc(100dvh-12rem)]  flex justify-center items-center">
        <div className="spinner"></div>
      </div>
      <div className="h-48"></div>
    </>
  );
}
