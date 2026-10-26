"use client";
import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import { blogEditorExtensions } from "@/lib/blogEditorExtensions";
import { uploadEditorImage } from "@/services/apiBlogImages";
import BlogEditorToolbar from "./BlogEditorToolbar";

export default function BlogEditor({ initial, onChange, onBusyChange, disabled = false }: { initial: JSONContent; onChange: (content: JSONContent) => void; onBusyChange: (busy: boolean) => void; disabled?: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const uploads = useRef(0);
  const [message, setMessage] = useState("");
  const editor = useEditor({
    extensions: blogEditorExtensions(), content: initial, immediatelyRender: false,
    editorProps: {
      attributes: { class: "blog-prose blog-editor-document", role: "textbox", "aria-label": "محتوای مقاله", "aria-multiline": "true", dir: "rtl" },
      handleDrop(view, event, moved) {
        const files = Array.from(event.dataTransfer?.files ?? []);
        if (moved || !files.length) return false;
        event.preventDefault();
        const position = view.posAtCoords({ left: event.clientX, top: event.clientY });
        if (position && editor) editor.commands.setTextSelection(position.pos);
        void insertImages(files);
        return true;
      },
      handlePaste(_view, event) {
        const files = Array.from(event.clipboardData?.files ?? []);
        if (!files.length) return false;
        event.preventDefault(); void insertImages(files); return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  });
  useEffect(() => () => { onBusyChange(false); }, [onBusyChange]);
  useEffect(() => { editor?.setEditable(!disabled, false); }, [editor, disabled]);

  async function insertImages(files: File[]) {
    if (!editor) return;
    setMessage("");
    for (const file of files) {
      const id = crypto.randomUUID();
      editor.chain().focus().insertContent({ type: "imageUpload", attrs: { id } }).run();
      uploads.current++; onBusyChange(true);
      try {
        const src = await uploadEditorImage(file);
        if (editor.isDestroyed) return;
        let at = -1;
        editor.state.doc.descendants((node, pos) => { if (node.type.name === "imageUpload" && node.attrs.id === id) at = pos; });
        // The placeholder tracks typing and dragging while the upload is in flight.
        if (at >= 0) editor.view.dispatch(editor.state.tr.replaceWith(at, at + 1, editor.schema.nodes.image.create({ src, alt: file.name.replace(/\.[^.]+$/, ""), width: 800 })));
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "آپلود تصویر انجام نشد.");
        if (!editor.isDestroyed) {
          let failedAt = -1;
          editor.state.doc.descendants((node, pos) => { if (node.type.name === "imageUpload" && node.attrs.id === id) failedAt = pos; });
          if (failedAt >= 0) editor.view.dispatch(editor.state.tr.delete(failedAt, failedAt + 1));
        }
      } finally { uploads.current--; onBusyChange(uploads.current > 0); }
    }
  }
  return <div className="blog-editor"><input ref={input} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" tabIndex={-1} aria-label="انتخاب تصویر برای متن" onChange={e => { void insertImages(Array.from(e.target.files ?? [])); e.target.value = ""; }} />{editor && <BlogEditorToolbar editor={editor} onImage={() => input.current?.click()} />}{!editor && <p className="blog-loading" role="status">در حال آماده‌سازی ادیتور…</p>}<EditorContent editor={editor} /><p className="blog-editor-help">تصویر را در محل دلخواه رها یا Paste کنید؛ برای جابه‌جایی، تصویر را بکشید. برای تنظیم کپشن و اندازه روی آن کلیک کنید.</p>{message && <p className="comment-error" role="alert">{message}</p>}</div>;
}
