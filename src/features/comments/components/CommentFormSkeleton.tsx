import Skeleton from "@/components/loading/Skeleton";

export default function CommentFormSkeleton({ subject = "خودرو" }: { subject?: string }) {
  return <div className="comment-compose" aria-hidden="true"><div className="comment-compose-title"><Skeleton className="skeleton-avatar" /><div><h3>شما از این {subject} بگویید</h3><p>یک دیدگاه تازه، یک انتخاب آگاهانه‌تر</p></div></div>
    <div className="comment-field"><span className="skeleton-field-label">نام شما (الزامی)</span><Skeleton className="skeleton-comment-input" /></div>
    <div className="comment-field"><span className="skeleton-field-label">متن دیدگاه (الزامی)</span><Skeleton className="skeleton-comment-textarea" /><div className="comment-field-hint"><span>با احترام و درباره همین {subject} بنویسید.</span><span>۰ / ۲٬۰۰۰</span></div></div>
    <p className="comment-moderation-note">دیدگاه شما پس از بررسی و تأیید ادمین منتشر می‌شود.</p><Skeleton className="comment-submit" />
  </div>;
}
