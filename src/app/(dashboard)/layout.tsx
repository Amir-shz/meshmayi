
function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="dashboard-shell h-dvh grid grid-cols-12">{children}</div>;
}

export default layout;
