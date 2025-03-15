import Logo from "../Logo";
import HeaderNav from "./HeaderNav";

function Header() {
  return (
    <header className="col-span-12 flex justify-between items-center py-4">
      <div className=" flex items-center gap-4">
        <Logo />
        <h2 className=" text-h5_B_desktop text-primary-500">
          شرکت زرسازان بهرو
        </h2>
      </div>
      <HeaderNav />
      <div>icon</div>
    </header>
  );
}

export default Header;
