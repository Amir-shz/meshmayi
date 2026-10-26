import { BookOpen } from "lucide-react";

export default function BlogMasthead() {
  return <header className="blog-masthead"><div><p className="blog-eyebrow">مجله زرسازان بهرو <span dir="ltr">THE JOURNAL</span></p><h1>هر مسیر،<br /><em>داستانی برای خواندن.</em></h1><p>نگاهی نزدیک‌تر به دنیای خودرو؛ از شناخت جزئیات تا لذت یک انتخاب آگاهانه.</p></div><div className="blog-masthead-mark" aria-hidden="true"><BookOpen size={64} strokeWidth={1} /><span>نگاه تازه به جهان خودرو</span></div></header>;
}
