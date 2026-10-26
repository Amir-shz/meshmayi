"use client";
export default function AdminBlogError({ reset }: { error: Error; reset: () => void }) { return <div className="blog-empty" role="alert"><h2>دریافت اطلاعات بلاگ انجام نشد</h2><p>اتصال را بررسی کنید و دوباره تلاش کنید.</p><button type="button" onClick={reset}>تلاش دوباره</button></div>; }
