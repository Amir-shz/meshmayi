import Image from "next/image";
import hero from "@/../public/hero.svg";

// h-[32.75rem] max-sm:h-28

function HeroSection() {
  return (
    <section id="home" className="">
      <Image
        src={hero}
        alt="zarsazan"
        loading="lazy"
        className=" w-full h-full object-contain"
      />
    </section>
  );
}

export default HeroSection;
