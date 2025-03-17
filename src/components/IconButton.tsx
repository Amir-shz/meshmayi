import { ReactNode } from "react";

interface iconButtonProps {
  size: "sm" | "lg" | "xl";
  className?: string;
  onClick: () => void;
  children: ReactNode;
}

function IconButton({ size, className, onClick, children }: iconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-neutral-100 border border-neutral-300 hover:bg-neutral-200 active:bg-neutral-300 rounded-full duration-300
      ${size === "xl" && "p-3 [&>svg]:size-6"}
      ${size === "lg" && "p-2 [&>svg]:size-6"}
      ${size === "sm" && "p-[0.38rem] [&>svg]:size-3"}
      `}
    >
      {children}
    </button>
  );
}

export default IconButton;
