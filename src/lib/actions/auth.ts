"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../session";

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

export async function login(prevState: object, formData: FormData) {
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

export async function logout() {
  await deleteSession();
  redirect("/login");
}
