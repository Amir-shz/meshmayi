// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

function DashboardPage() {
  return (
    <div className="col-span-full items-start">
      <div className=" flex justify-center items-center h-[calc(100dvh-256px)] w-full">
        <p className="text-center text-3xl font-semibold text-primary-600 -translate-x-7">
          به داشبورد سایت زرسازان بهرو خوش آمدید
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
