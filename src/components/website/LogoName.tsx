import Image from "next/image";
import logo from "@/../public/logoWithName.png";

function LogoName() {
  return (
    <Image
      src={logo}
      width={1000}
      height={1000}
      className=" w-48 max-sm:w-28"
      alt="zarsazan behro"
    />
  );
}

export default LogoName;
