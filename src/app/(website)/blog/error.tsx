"use client";
export default function BlogError({ reset }: { error: Error; reset: () => void }) {
  return <div className="blog-empty col-span-full" role="alert"><h2>مجله فعلاً در دسترس نیست</h2><p>دریافت مقاله‌ها انجام نشد؛ لطفاً دوباره تلاش کنید.</p><button type="button" onClick={reset}>تلاش دوباره</button></div>;
}
