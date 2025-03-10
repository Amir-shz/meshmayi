"use client";

import { ReactNode } from "react";

interface buttonProps {
  type?: "filled" | "outline" | "text" | "delete";
  size?: "small" | "big" | "Xbig";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  icon?: ReactNode | false;
  children: string;
  submit?: boolean;
}

function Button({
  type = "filled",
  size = "small",
  disabled = false,
  icon = false,
  fullWidth = false,
  onClick = () => {},
  submit = false,
  children,
}: buttonProps) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg px-6 duration-300
        ${fullWidth && "w-full flex justify-center items-center"}
        ${icon && "flex items-center gap-2 pl-4"}
        ${
          type === "filled" &&
          " bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-neutral-50 disabled:bg-neutral-200"
        } 
        ${
          type === "outline" &&
          " border border-primary-400 hover:bg-primary-50 active:bg-primary-200 text-primary-500 disabled:border-neutral-300 disabled:bg-white disabled:text-neutral-300"
        } 
        ${
          type === "text" &&
          "hover:bg-primary-50 active:bg-primary-200 text-primary-500 disabled:border-neutral-300 disabled:bg-white disabled:text-neutral-300"
        }
        ${
          type === "delete" &&
          " border border-red-500 text-red-500 hover:bg-red-50 disabled:border-neutral-300 disabled:bg-white disabled:text-neutral-300"
        }
        ${
          size === "small" &&
          "h-8 py-2 text-p4_M_desktop leading-[1.05863rem] [&>svg]:size-4"
        }
        ${
          size === "big" &&
          "h-10 py-[0.62rem] text-p2_M_desktop leading-[1.23rem] [&>svg]:size-5"
        }
        ${
          size === "Xbig" &&
          "h-12 py-[0.62rem] text-p2_M_desktop leading-[1.23rem] [&>svg]:size-5"
        }
      `}
    >
      {children}
      {icon}
    </button>
  );
}

export default Button;
