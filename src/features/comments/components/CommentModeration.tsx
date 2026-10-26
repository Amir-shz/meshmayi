"use client";

import { useActionState, useState } from "react";
import { Check, RotateCcw, Trash2, X } from "lucide-react";
import { moderateComment } from "@/lib/actions/comments";
import type { CommentFormState, CommentStatus } from "../types/comment";

export default function CommentModeration({ id, status, moderationAction = moderateComment }: { id: string; status: CommentStatus; moderationAction?: (previous: CommentFormState, form: FormData) => Promise<CommentFormState> }) {
  const [state, action, pending] = useActionState<CommentFormState, FormData>(moderationAction, {});
  const [confirmDelete, setConfirmDelete] = useState(false);

  function submit(nextStatus: CommentStatus | "delete", form: FormData) {
    // Pass the decision explicitly instead of relying on the browser's submitter field.
    form.set("id", id);
    form.set("status", nextStatus);
    action(form);
  }

  return <form action={action} className="comment-moderation" aria-busy={pending}>
    <input type="hidden" name="id" value={id} />
    <div>
      {status !== "approved" && <button type="submit" formAction={submit.bind(null, "approved")} className="comment-approve-button" disabled={pending}><Check size={17} aria-hidden="true" />تأیید و انتشار</button>}
      {status !== "rejected" && <button type="submit" formAction={submit.bind(null, "rejected")} disabled={pending}><X size={17} aria-hidden="true" />{status === "approved" ? "لغو انتشار" : "رد نظر"}</button>}
      {status !== "pending" && <button type="submit" formAction={submit.bind(null, "pending")} disabled={pending}><RotateCcw size={16} aria-hidden="true" />بررسی مجدد</button>}
      {!confirmDelete && <button type="button" className="comment-delete-button" onClick={() => setConfirmDelete(true)} disabled={pending}><Trash2 size={17} aria-hidden="true" />حذف نظر</button>}
    </div>
    {confirmDelete && <div className="comment-delete-confirm" role="group" aria-label="تأیید حذف نظر">
      <p>این نظر برای همیشه حذف می‌شود. مطمئنید؟</p>
      <button type="submit" className="comment-delete-button" formAction={submit.bind(null, "delete")} disabled={pending}>بله، حذف شود</button>
      <button type="button" onClick={() => setConfirmDelete(false)} disabled={pending}>انصراف</button>
    </div>}
    <p role="status" className={state.success ? "" : "comment-error"}>{pending ? "در حال ذخیره…" : state.message}</p>
  </form>;
}
