import "server-only";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { BlogError } from "@/lib/blogErrors";

export async function blogVisitor(requireExisting = false) {
  if (!process.env.JWT_SECRET) throw new Error("تنظیمات نشست در دسترس نیست.");
  const key = new TextEncoder().encode(process.env.JWT_SECRET);
  const store = await cookies();
  const token = store.get("blog-voter")?.value;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, key, { audience: "blog-voter", algorithms: ["HS256"] });
      if (payload.sub && /^[a-f\d-]{36}$/i.test(payload.sub)) return payload.sub;
    } catch { /* An expired or forged visitor token receives a new anonymous identity. */ }
  }
  if (requireExisting) throw new BlogError("برای ثبت امتیاز، کوکی‌ها باید فعال باشند؛ صفحه را تازه کنید.");
  const id = randomUUID();
  const signed = await new SignJWT({}).setSubject(id).setAudience("blog-voter").setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("365d").sign(key);
  store.set("blog-voter", signed, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 365 * 86400, path: "/" });
  return id;
}
