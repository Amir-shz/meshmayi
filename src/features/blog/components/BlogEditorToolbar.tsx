"use client";
import { useEditorState, type Editor } from "@tiptap/react";
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Undo2, Redo2, ImagePlus, Link2, Minus, Table2, AlignRight, AlignCenter, AlignLeft, Highlighter, Code2 } from "lucide-react";
import { BLOG_FONTS, BLOG_SIZES, safeBlogLink } from "@/lib/blogContent";

export default function BlogEditorToolbar({ editor, onImage }: { editor: Editor; onImage: () => void }) {
  useEditorState({ editor, selector: ({ editor }) => ({ selection: editor.state.selection.from, to: editor.state.selection.to, revision: editor.state.doc.content.size, marks: editor.state.storedMarks, attrs: editor.getAttributes("textStyle") }) });
  const tools = [
    { label: "پررنگ", icon: Bold, active: editor.isActive("bold"), run: () => editor.chain().focus().toggleBold().run() },
    { label: "ایتالیک", icon: Italic, active: editor.isActive("italic"), run: () => editor.chain().focus().toggleItalic().run() },
    { label: "زیرخط", icon: Underline, active: editor.isActive("underline"), run: () => editor.chain().focus().toggleUnderline().run() },
    { label: "خط‌خوردگی", icon: Strikethrough, active: editor.isActive("strike"), run: () => editor.chain().focus().toggleStrike().run() },
    { label: "لیست نشانه‌دار", icon: List, active: editor.isActive("bulletList"), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: "لیست شماره‌دار", icon: ListOrdered, active: editor.isActive("orderedList"), run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: "نقل‌قول", icon: Quote, active: editor.isActive("blockquote"), run: () => editor.chain().focus().toggleBlockquote().run() },
    { label: "کد", icon: Code2, active: editor.isActive("codeBlock"), run: () => editor.chain().focus().toggleCodeBlock().run() },
    { label: "راست‌چین", icon: AlignRight, active: editor.isActive({ textAlign: "right" }), run: () => editor.chain().focus().setTextAlign("right").run() },
    { label: "وسط‌چین", icon: AlignCenter, active: editor.isActive({ textAlign: "center" }), run: () => editor.chain().focus().setTextAlign("center").run() },
    { label: "چپ‌چین", icon: AlignLeft, active: editor.isActive({ textAlign: "left" }), run: () => editor.chain().focus().setTextAlign("left").run() },
    { label: "هایلایت", icon: Highlighter, active: editor.isActive("highlight"), run: () => editor.chain().focus().toggleHighlight({ color: "#f5e3ac" }).run() },
  ];
  function link() {
    const url = window.prompt("آدرس لینک (https://…)، برای حذف خالی بگذارید:", editor.getAttributes("link").href ?? "");
    if (url === null) return;
    if (!url) { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    if (!safeBlogLink(url)) { window.alert("آدرس لینک معتبر نیست."); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }
  return <div className="blog-editor-toolbar" aria-label="ابزارهای ویرایش مقاله">
    <label><span className="sr-only">نوع متن</span><select value={editor.isActive("heading") ? String(editor.getAttributes("heading").level) : "p"} onChange={e => e.target.value === "p" ? editor.chain().focus().setParagraph().run() : editor.chain().focus().toggleHeading({ level: Number(e.target.value) as 2 | 3 | 4 }).run()}><option value="p">متن معمولی</option><option value="2">تیتر بزرگ</option><option value="3">تیتر متوسط</option><option value="4">تیتر کوچک</option></select></label>
    <label><span className="sr-only">فونت</span><select value={editor.getAttributes("textStyle").fontFamily || "inherit"} onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}>{BLOG_FONTS.map((font, i) => <option value={font} key={font}>{["فونت سایت", "Tahoma", "Arial", "Georgia"][i]}</option>)}</select></label>
    <label><span className="sr-only">اندازه متن</span><select value={editor.getAttributes("textStyle").fontSize || "16px"} onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}>{BLOG_SIZES.map(size => <option key={size}>{size}</option>)}</select></label>
    {tools.map(tool => <button type="button" key={tool.label} aria-label={tool.label} title={tool.label} aria-pressed={tool.active} onClick={tool.run}><tool.icon size={18} aria-hidden="true" /></button>)}
    <label className="blog-color-label">رنگ<input aria-label="رنگ متن" type="color" value={editor.getAttributes("textStyle").color || "#262626"} onChange={e => editor.chain().focus().setColor(e.target.value).run()} /></label>
    <button type="button" onClick={link} aria-label="درج یا ویرایش لینک" title="درج لینک"><Link2 size={18} aria-hidden="true" /></button>
    <button type="button" onClick={onImage} aria-label="درج تصویر" title="درج تصویر"><ImagePlus size={18} aria-hidden="true" /></button>
    <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} aria-label="درج جدول" title="درج جدول"><Table2 size={18} aria-hidden="true" /></button>
    <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} aria-label="خط جداکننده" title="خط جداکننده"><Minus size={18} aria-hidden="true" /></button>
    <label><span className="sr-only">جهت متن</span><select value={editor.getAttributes(editor.isActive("heading") ? "heading" : "paragraph").dir || "rtl"} onChange={e => editor.chain().focus().updateAttributes(editor.isActive("heading") ? "heading" : "paragraph", { dir: e.target.value }).run()}><option value="rtl">راست‌به‌چپ</option><option value="ltr">چپ‌به‌راست</option></select></label>
    <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} aria-label="واگرد" title="واگرد"><Undo2 size={18} aria-hidden="true" /></button><button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} aria-label="انجام دوباره" title="انجام دوباره"><Redo2 size={18} aria-hidden="true" /></button>
    {editor.isActive("table") && <div className="blog-editor-context">{[{ label: "افزودن ردیف", run: () => editor.chain().focus().addRowAfter().run() }, { label: "افزودن ستون", run: () => editor.chain().focus().addColumnAfter().run() }, { label: "حذف ردیف", run: () => editor.chain().focus().deleteRow().run() }, { label: "حذف ستون", run: () => editor.chain().focus().deleteColumn().run() }, { label: "حذف جدول", run: () => editor.chain().focus().deleteTable().run() }].map(item => <button type="button" key={item.label} onClick={item.run}>{item.label}</button>)}</div>}
    {editor.isActive("image") && <div className="blog-editor-context"><label>توضیح تصویر<input value={editor.getAttributes("image").alt || ""} maxLength={200} onChange={e => editor.chain().updateAttributes("image", { alt: e.target.value }).run()} /></label><label>کپشن<input value={editor.getAttributes("image").caption || ""} maxLength={500} onChange={e => editor.chain().updateAttributes("image", { caption: e.target.value }).run()} /></label><label>عرض<input type="number" min={50} max={2400} value={editor.getAttributes("image").width || 800} onChange={e => editor.chain().updateAttributes("image", { width: Number(e.target.value) }).run()} /></label><label>چیدمان<select value={editor.getAttributes("image").align || "center"} onChange={e => editor.chain().updateAttributes("image", { align: e.target.value }).run()}><option value="center">وسط</option><option value="right">راست</option><option value="left">چپ</option></select></label><button type="button" onClick={() => editor.chain().focus().deleteSelection().run()}>حذف تصویر</button></div>}
  </div>;
}
