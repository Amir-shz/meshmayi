"use client";
import { useActionState, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteBlog } from "@/lib/actions/blog";
import type { BlogActionState } from "../types/blog";

export default function BlogDeleteButton({ id }: { id: string }) {
  const [confirm, setConfirm] = useState(false);
  const [state, action, pending] = useActionState<BlogActionState, FormData>(deleteBlog, {});
  return <form action={action} className="blog-delete-form"><input type="hidden" name="id" value={id} />{confirm ? <><p>مقاله و تعاملات آن از دسترس خارج شوند؟</p><button type="submit" disabled={pending} className="blog-danger">بله، حذف شود</button><button type="button" onClick={() => setConfirm(false)} disabled={pending}>انصراف</button></> : <button type="button" onClick={() => setConfirm(true)} className="blog-danger"><Trash2 size={16} aria-hidden="true" />حذف مقاله</button>}<span role="status">{pending ? "در حال حذف…" : state.message}</span></form>;
}
