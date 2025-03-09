interface TextFieldProps {
  size?: "small" | "mobile" | "big";
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name: string;
  id: string;
}

function TextField({
  size = "small",
  label,
  placeholder = "",
  error = "",
  name,
  id,
  disabled = false,
}: TextFieldProps) {
  return (
    <label
      htmlFor={id}
      className={`
      text-neutral-700 flex flex-col
        ${disabled && "text-neutral-300"}
        ${size === "small" && " text-p3_M_desktop"}
        ${size === "mobile" && " text-p4_M_mobile"}
        ${size === "big" && " text-p3_M_desktop"}
      `}
    >
      {label}

      <input
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-2 mb-1 rounded-lg border hover:border-primary-500 focus:outline-none focus:border-primary-500 bg-neutral-50 text-neutral-600 duration-300
          ${
            disabled
              ? " border-neutral-300 hover:border-neutral-300 "
              : "border-neutral-400"
          }
          ${size === "small" && "pr-4 h-12 text-p2_M_desktop"}
          ${size === "mobile" && " pr-3 h-10 text-p2_M_mobile"} 
          ${size === "big" && " pr-4 h-12 text-p2_M_desktop  "}
          `}
      />
      <p
        className={`
        text-red-500 
        ${disabled && "text-neutral-300"}
        ${size === "small" && "text-p4_R_desktop"}
        ${size === "mobile" && "text-lb2_mobile"}
        ${size === "big" && "text-p4_R_desktop"}
        ${error ? " visible" : "invisible"}
        `}
      >
        {error ? error : "متن پیشفرض"}
      </p>
    </label>
  );
}

export default TextField;
