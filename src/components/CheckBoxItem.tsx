"use client";

import { HiOutlineCheck } from "react-icons/hi";

function CheckBoxItem({
  checked,
  label,
  disabled = false,
  name,
}: {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  name: string;
}) {
  return (
    <label className=" flex cursor-pointer items-center gap-1 max-xs:gap-0 [&>span]:hover:bg-primary-100 [&>span]:active:bg-primary-200 max-xs:[&>span]:hover:bg-transparent max-xs:[&>span]:active:bg-primary-200 ">
      <input
        type="checkbox"
        name={name}
        value={label}
        defaultChecked={checked}
        className={`h-0 w-0 opacity-0 [&~span>span>svg]:checked:block [&~span>span]:checked:border-primary-500 [&~span>span]:checked:bg-primary-500    

        `}
        disabled={disabled}
      ></input>
      <span className=" custom-transition flex size-10 items-center justify-center rounded-full">
        <span className="  inline-block size-5 rounded border-2 border-neutral-700">
          <HiOutlineCheck className=" hidden text-neutral-50" />
        </span>
      </span>
      <p className=" text-p3_M_desktop text-neutral-700">{label}</p>
    </label>
  );
}

export default CheckBoxItem;
