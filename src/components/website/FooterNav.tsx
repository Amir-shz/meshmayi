import Link from "next/link";

function FooterNav() {
  return (
    <nav className="  p-1 rounded-lg border border-neutral-300 w-fit mx-auto">
      <ul className="flex justify-center gap-4 [&>li]:py-1  [&>li]:px-3 [&>li]:rounded-lg">
        <li className="hover:bg-primary-50 duration-300">
          <Link href="#home">صفحه اصلی</Link>
        </li>
        <li className="hover:bg-primary-50 duration-300">
          <Link href="#about-us">درباره ما</Link>
        </li>
        <li className="hover:bg-primary-50 duration-300">
          <Link href="#contact-us">ارتباط با ما</Link>
        </li>
        <li className="hover:bg-primary-50 duration-300">
          <Link href="#faq">سوالات متداول</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;
