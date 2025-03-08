import "server-only";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// ENCRYPT SESSION (JWT)
export async function encrypt(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  } as jwt.SignOptions);
}

// DECRYPT SESSION (JWT)
export async function decrypt(session: string | undefined = "") {
  try {
    const decoded = jwt.verify(session, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    console.log(error);
    console.log("Failed to verify session");
  }
}

// CREATE SESSION
export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// DELETE SESSION
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
