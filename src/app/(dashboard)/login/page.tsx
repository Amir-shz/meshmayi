import LoginForm from "@/features/auth/LoginForm";
import { Metadata } from "next";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "ورود به داشبورد",
  description: "",
};

function LoginPage() {
  return (
    <div className=" col-start-4 col-end-10 self-center">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
