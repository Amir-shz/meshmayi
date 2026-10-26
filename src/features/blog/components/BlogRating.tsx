"use client";
import { useEffect, useState, useTransition } from "react";
import { Star } from "lucide-react";
import { getMyBlogRating, rateBlog } from "@/lib/actions/blog";

export default function BlogRating({ postId, initial }: { postId: string; initial: { average: number; count: number } }) {
  const [summary, setSummary] = useState(initial), [rating, setRating] = useState(0), [hover, setHover] = useState(0);
  const [ready, setReady] = useState(false), [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    let cancelled = false;
    getMyBlogRating(postId).then(result => { if (!cancelled) { setRating(result.rating); setReady(true); if (result.message) setMessage(result.message); } }).catch(() => { if (!cancelled) setMessage("امتیازدهی فعلاً در دسترس نیست؛ صفحه را تازه کنید."); });
    return () => { cancelled = true; };
  }, [postId]);
  function vote(value: number) {
    startTransition(async () => {
      try {
        const result = await rateBlog(postId, value);
        if ("success" in result && result.success) { setRating(result.rating); setSummary({ average: result.average, count: result.count }); }
        setMessage(result.message ?? "");
      } catch { setMessage("ثبت امتیاز انجام نشد؛ دوباره تلاش کنید."); }
    });
  }
  return <section className="blog-rating" aria-labelledby="rating-heading"><div><p className="blog-eyebrow">این مطلب چقدر برایتان مفید بود؟</p><h2 id="rating-heading">امتیاز شما، راهنمای ماست</h2><p>{summary.count ? `${summary.average.toLocaleString("fa-IR", { maximumFractionDigits: 1 })} از ۵ · ${summary.count.toLocaleString("fa-IR")} امتیاز` : "هنوز امتیازی ثبت نشده؛ اولین نفر باشید."}</p></div><div>
    <fieldset disabled={pending || !ready} className="blog-stars"><legend className="sr-only">امتیاز به مقاله، از یک تا پنج ستاره</legend>{[1, 2, 3, 4, 5].map(value => <label key={value} onMouseEnter={() => setHover(value)} onMouseLeave={() => setHover(0)}><input className="sr-only" type="radio" name={`rating-${postId}`} value={value} checked={rating === value} onChange={() => vote(value)} aria-label={`${value} ستاره`} /><Star size={29} fill={value <= (hover || rating) ? "currentColor" : "none"} aria-hidden="true" /></label>)}</fieldset>
    <p role="status">{pending ? "در حال ثبت امتیاز…" : message || (rating ? "می‌توانید امتیازتان را تغییر دهید." : "امتیازدهی مستقل از ثبت نظر است.")}</p></div></section>;
}
