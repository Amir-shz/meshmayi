"use client";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import TextField from "@/components/TextField";
import { login } from "@/lib/actions/auth";
import Link from "next/link";
import { useActionState, useState } from "react";

const initialState = {
  usernameError: "",
  passwordError: "",
};

function LoginForm() {
  // @ts-expect-error :: i dont want this error
  const [state, formAction] = useActionState(login, initialState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action={formAction}>
      <div className="mb-6 flex flex-col items-center justify-center gap-4">
        <Link href="/">
          <Logo />
        </Link>
        <p className=" text-black text-h4_B_desktop">صفحه ورود به داشبورد</p>
      </div>
      <div className=" flex flex-col gap-8">
        <TextField
          label="نام کاربری"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={state?.usernameError}
        />
        <TextField
          label="رمز عبور"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={state?.passwordError}
        />
        <Button fullWidth size="Xbig" submit>
          ورود به داشبورد
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
