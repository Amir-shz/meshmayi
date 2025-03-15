import Footer from "@/components/website/Footer";
import Header from "@/components/website/Header";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-50">
      <div className=" mx-12">
        <div className="grid grid-cols-12 container gap-8 mx-auto">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
      <div className="w-screen bg-primary-500 h-6"></div>
    </div>
  );
}

export default layout;
