"use client";

import { useActionState, useState } from "react";
import { ArrowLeft, CheckCircle2, LoaderCircle, PenLine, ShieldCheck } from "lucide-react";
import { submitComment } from "@/lib/actions/comments";
import type { CommentFormState } from "../types/comment";

export default function CommentForm({ carId, submitAction, subject = "خودرو" }: { carId: string; submitAction?: (previous: CommentFormState, form: FormData) => Promise<CommentFormState>; subject?: string }) {
  const [state, action, pending] = useActionState<CommentFormState, FormData>(submitAction ?? submitComment.bind(null, carId), {});
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  return (
    <div className="comment-compose">
      <div className="comment-compose-title"><span><PenLine size={21} aria-hidden="true" /></span><div><h3>شما از این {subject} بگویید</h3><p>یک دیدگاه تازه، یک انتخاب آگاهانه‌تر</p></div></div>
      {state.success ? (
        <div className="comment-success" role="status"><CheckCircle2 size={32} aria-hidden="true" /><h4>ممنون که دیدگاهتان را نوشتید</h4><p>{state.message}</p><span>در انتظار بررسی ادمین</span></div>
      ) : (
        <form action={action} aria-busy={pending}>
          <div className="comment-field">
            <label htmlFor="comment-name">نام شما <span>(الزامی)</span></label>
            <input id="comment-name" name="name" autoComplete="name" required minLength={2} maxLength={60} value={name} onChange={e => setName(e.target.value)} placeholder="نامی که کنار نظر نمایش داده می‌شود" aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "comment-name-error" : undefined} />
            {state.errors?.name && <p id="comment-name-error" className="comment-error">{state.errors.name}</p>}
          </div>
          <div className="comment-field">
            <label htmlFor="comment-text">متن دیدگاه <span>(الزامی)</span></label>
            <textarea id="comment-text" name="text" required minLength={5} maxLength={2000} rows={5} value={text} onChange={e => setText(e.target.value)} placeholder={`تجربه، سؤال یا دیدگاهتان درباره این ${subject} را بنویسید…`} aria-invalid={!!state.errors?.text} aria-describedby={`comment-text-hint${state.errors?.text ? " comment-text-error" : ""}`} />
            <div id="comment-text-hint" className="comment-field-hint"><span>با احترام و درباره همین {subject} بنویسید.</span><span>{text.length.toLocaleString("fa-IR")} / ۲٬۰۰۰</span></div>
            {state.errors?.text && <p id="comment-text-error" className="comment-error">{state.errors.text}</p>}
          </div>
          <div className="comment-honeypot" aria-hidden="true"><label htmlFor="comment-website">وب‌سایت</label><input id="comment-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <p className="comment-moderation-note"><ShieldCheck size={18} aria-hidden="true" />دیدگاه شما پس از بررسی و تأیید ادمین منتشر می‌شود.</p>
          <div aria-live="polite" aria-atomic="true">{state.message && <p className="comment-error" role="alert">{state.message}</p>}</div>
          <button className="comment-submit" type="submit" disabled={pending}>{pending ? <><LoaderCircle className="comment-spinner" size={18} aria-hidden="true" />در حال ارسال…</> : <>ثبت دیدگاه<ArrowLeft size={18} aria-hidden="true" /></>}</button>
        </form>
      )}
    </div>
  );
}
