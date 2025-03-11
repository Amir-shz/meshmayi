"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../session";

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

// LOGIN SERVER ACTION

export async function login(
  prevState: object,
  // | undefined
  // | {
  //     usernameError?: string | undefined;
  //     passwordError?: string | undefined;
  //   },
  formData: FormData
) {
  if (
    formData.get("username") === username &&
    formData.get("password") === password
  ) {
    await createSession(username);
    return redirect("/dashboard");
  }

  if (formData.get("username") !== username) {
    return {
      usernameError: "نام کاربری اشتباه است",
    };
  }

  if (formData.get("password") !== password) {
    return {
      passwordError: "رمز عبور اشتباه است",
    };
  }
}

// LOGOUT SERVER ACTION

export async function logout() {
  await deleteSession();
  redirect("/login");
}
