import Link from "next/link";
import Logo from "../Logo";
import CallIconButton from "./CallIconButton";
import HeaderNav from "./HeaderNav";

function Header() {
  return (
    <header className=" fixed top-0 left-1/2 -translate-x-1/2 w-full grid grid-cols-12 gap-8 py-4 bg-neutral-50 z-50 ">
      <div className=" flex justify-between items-center col-span-full mx-12">
        <div className=" flex items-center gap-4">
          <Logo />
          <Link href="/">
            <h2 className=" text-h5_B_desktop text-primary-500">
              شرکت زرسازان بهرو
            </h2>
          </Link>
        </div>
        <HeaderNav />
        <CallIconButton size="lg" />
      </div>
    </header>
  );
}

export default Header;
