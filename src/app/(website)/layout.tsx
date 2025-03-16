import Footer from "@/components/website/Footer";
import Header from "@/components/website/Header";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-50">
      <div className="relative mx-12">
        <Header />
        {/* container */}
        <div className="grid grid-cols-12 gap-8 mx-auto pt-[7.25rem]">
          {children}
          <Footer />
        </div>
      </div>
      <div className="w-full bg-primary-500 h-6"></div>
    </div>
  );
}

export default layout;
