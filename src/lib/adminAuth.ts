import "server-only";
import { verifySession } from "@/lib/session";

export async function requireAdmin() {
  const session = await verifySession();
  if (!process.env.ADMIN_USERNAME || session.username !== process.env.ADMIN_USERNAME) throw new Error("دسترسی ادمین لازم است.");
  return session;
}
