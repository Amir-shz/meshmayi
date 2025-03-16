import Link from "next/link";
import Button from "../Button";
import { HiOutlineArrowLeft } from "react-icons/hi";

interface sectionsHeaderProps {
  title: string;
  href?: string;
  linkTitle?: string;
}

function SectionsHeader({
  title,
  href = "",
  linkTitle = "",
}: sectionsHeaderProps) {
  return (
    <div className=" flex items-center justify-between mb-4 max-sm:mb-5">
      <div className=" py-1 px-3 border-r-4 border-r-primary-500">
        <p className=" text-neutral-800 leading-8 text-[1.42375rem] font-bold max-sm:text-h5_SB_mobile">
          {title}
        </p>
      </div>
      {href && (
        <Link href={href}>
          <Button type="text" size="big" icon={<HiOutlineArrowLeft />}>
            {linkTitle}
          </Button>
        </Link>
      )}
    </div>
  );
}

export default SectionsHeader;
