"use client";

import { ReactNode } from "react";

interface buttonProps {
  type?: "filled" | "outline" | "text";
  size?: "small" | "big" | "Xbig";
  disable?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  icon?: ReactNode | false;
  children: string;
}

function Button({
  type = "filled",
  size = "small",
  disable = false,
  icon = false,
  fullWidth = false,
  onClick = () => {},
  children,
}: buttonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
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
