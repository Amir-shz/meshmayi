function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className=" h-dvh grid grid-cols-12">{children}</div>;
}

export default layout;
