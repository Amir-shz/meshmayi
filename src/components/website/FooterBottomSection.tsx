import Link from "next/link";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import TelegramIcon from "../icons/TelegramIcon";
import WhatsappIcon from "../icons/WhatsappIcon";

function FooterBottomSection() {
  return (
    <div className=" flex items-center justify-between">
      <div className=" flex gap-[5.5rem] items-center [&>a]:py-9">
        <Link href="#">
          <TelegramIcon />
        </Link>
        <Link href="#">
          <WhatsappIcon />
        </Link>
        <Link href="#">
          <InstagramIcon />
        </Link>
        <Link href="#">
          <LinkedinIcon />
        </Link>
      </div>
      <div className=" flex items-center gap-1 text-neutral-500">
        <p className=" text-sm font-medium ">
          All Rights Reserved by Zarsazan group
        </p>
        <p>&copy;</p>
      </div>
    </div>
  );
}

export default FooterBottomSection;
