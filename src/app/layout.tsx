import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const IranSans = localFont({
  src: [
    {
      path: "../fonts/IRANSansX-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansX-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansX-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansX-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansX-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansX-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansX-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansX-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansX-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--iranSans",
});

export const metadata: Metadata = {
  title: "زرسازان بهرو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="max-2xl:text-[93.75%] lg:text-[87.5%] xl:text-[93.75%] 2xl:text-[112.5%]"
    >
      <body
        className={`${IranSans.className} ${IranSans.variable} antialiased scroll-smooth bg-neutral-50`}
      >
        {children}
      </body>
    </html>
  );
}
