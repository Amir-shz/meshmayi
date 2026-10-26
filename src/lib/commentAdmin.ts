import "server-only";
import { requireAdmin } from "@/lib/adminAuth";

export async function requireCommentAdmin() {
  await requireAdmin();
}
