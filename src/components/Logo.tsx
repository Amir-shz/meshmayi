import Image from "next/image";
import logo from "@/../public/logo.png";

function Logo() {
  return (
    <Image
      src={logo}
      width={1000}
      height={1000}
      className=" size-14"
      alt="zarsazan behro"
    />
  );
}

export default Logo;
