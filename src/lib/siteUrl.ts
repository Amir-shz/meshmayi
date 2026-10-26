export function siteUrl() {
  const configured = process.env.SITE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  if (configured) return new URL(configured).origin;
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";
  throw new Error("SITE_URL برای آدرس اصلی وب‌سایت تنظیم نشده است.");
}
