import SectionsHeader from "./SectionsHeader";

function ProductSectionLoader() {
  return (
    <div>
      <SectionsHeader
        title="محصولات"
        href="/products"
        linkTitle="محصولات بیشتر"
      />
      <div className="sm:grid max-sm:flex max-sm:shrink-0 sm:grid-cols-3 sm:gap-8 gap-3 [&>div]:rounded-lg max-sm:[&>div]:min-w-[249px] sm:w-full max-sm:overflow-hidden max-sm:-ml-4 [&>div]:h-[282px] sm:[&>div]:h-[400px] max-sm:flex-nowrap [&>div]:bg-neutral-200 [&>div]:animate-pulse">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className=" max-sm:hidden"></div>
        <div className=" max-sm:hidden"></div>
      </div>
      <div className=" sm:hidden mt-3 max-sm:flex max-sm:shrink-0 gap-3 [&>div]:rounded-lg max-sm:[&>div]:min-w-[249px] [&>div]:h-[282px] max-sm:overflow-hidden max-sm:-ml-4 max-sm:flex-nowrap [&>div]:bg-neutral-200 [&>div]:animate-pulse">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default ProductSectionLoader;
