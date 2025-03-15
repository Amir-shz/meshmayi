import NavItem from "./NavItem";

function HeaderNav() {
  return (
    <nav className=" flex gap-10 translate-x-20 ">
      <NavItem id="home" active>
        صفحه اصلی
      </NavItem>
      <NavItem id="products">محصولات</NavItem>
      <NavItem id="about-us">درباره ما</NavItem>
      <NavItem id="contact-us">ارتباط با ما</NavItem>
      <NavItem id="faq">سوالات متداول</NavItem>
    </nav>
  );
}

export default HeaderNav;
