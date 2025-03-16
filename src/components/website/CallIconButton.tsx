import { PHONE_NUMBER } from "@/utils/utils";
import Link from "next/link";
import { HiOutlinePhone } from "react-icons/hi";

interface callIconButtonProps {
  size: "sm" | "lg";
  disabled?: boolean;
}

function CallIconButton({ size, disabled = false }: callIconButtonProps) {
  return (
    <Link
      href={`tel:${PHONE_NUMBER}`}
      className={` rounded border duration-300
        ${size === "sm" ? "p-3" : "p-4 max-sm:p-3"}
        ${
          disabled
            ? " border-neutral-300 hover:border-neutral-300"
            : "bg-neutral-50  border-neutral-400 hover:border-primary-300 hover:bg-neutral-100 active:bg-primary-50 active:border-primary-400"
        }
        `}
    >
      <HiOutlinePhone className=" size-6 text-neutral-600" />
    </Link>
  );
}

export default CallIconButton;
