import Image from "next/image";

function Logo() {
  return (
    <Image
      src="/logo.png"
      width={1000}
      height={1000}
      className=" size-14"
      alt="zarsazan behro"
    />
  );
}

export default Logo;
