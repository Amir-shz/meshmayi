import { redirect } from "next/navigation";
import { deleteSession } from "../session";

export async function login(formData: FormData) {
  console.log(formData);
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
