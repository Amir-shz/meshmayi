import LoginForm from "@/features/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود به داشبورد",
  description: "",
};

function LoginPage() {
  return (
    <div className=" col-start-4 col-end-10 self-center">
      <LoginForm />;
    </div>
  );
}

export default LoginPage;
