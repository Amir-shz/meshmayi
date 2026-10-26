// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="dashboard-shell h-dvh grid grid-cols-12">{children}</div>;
}

export default layout;
