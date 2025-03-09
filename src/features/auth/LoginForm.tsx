"use client";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import TextField from "@/components/TextField";
import { login } from "@/lib/actions/auth";
import { useActionState } from "react";

const initialState = {
  usernameError: "",
  passwordError: "",
};

function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction}>
      <div className="mb-6 flex flex-col items-center justify-center gap-4">
        <Logo />
        <p className=" text-black text-h4_B_desktop">صفحه ورود به داشبورد</p>
      </div>
      <div className=" flex flex-col gap-8">
        <TextField
          label="نام کاربری"
          id="username"
          name="username"
          error={state?.usernameError}
        />
        <TextField
          label="رمز عبور"
          id="password"
          name="password"
          error={state?.passwordError}
        />
        <Button fullWidth size="Xbig">
          ورود به داشبورد
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
