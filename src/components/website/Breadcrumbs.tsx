import { digitsEnToFa } from "@persian-tools/persian-tools";
import Link from "next/link";

function Breadcrumbs({ name }: { name: string }) {
  return (
    <div className=" col-span-full text-p2_M_desktop max-sm:text-p3_M_desktop text-neutral-500 py-7 mb-6 max-sm:-mt-4 max-sm:py-0">
      <Link href={`/`} className="hover:text-neutral-800 duration-300">
        صفحه اصلی
      </Link>
      <span> / </span>
      <Link href={`/products`} className="hover:text-neutral-800 duration-300">
        محصولات
      </Link>
      <span> / </span>
      <p className=" inline">{digitsEnToFa(name)}</p>
    </div>
  );
}

export default Breadcrumbs;
