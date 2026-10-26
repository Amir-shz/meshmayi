import { Extension, Node, ResizableNodeView, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";

const Direction = Extension.create({
  name: "blogDirection",
  addGlobalAttributes() { return [{ types: ["paragraph", "heading"], attributes: { dir: { default: "rtl", parseHTML: element => element.getAttribute("dir") ?? "rtl", renderHTML: attrs => ({ dir: attrs.dir }) } } }]; },
});

const BlogImage = Image.extend({
  addAttributes() {
    return { ...this.parent?.(), caption: { default: "" }, align: { default: "center" } };
  },
  renderHTML({ HTMLAttributes }) {
    const { caption, align, ...image } = HTMLAttributes;
    return ["figure", { class: `blog-inline-image image-${align}`, "data-type": "blog-image" }, ["img", mergeAttributes(this.options.HTMLAttributes, image)], ["figcaption", {}, caption || ""]];
  },
  parseHTML() { return [{ tag: "figure[data-type=blog-image] img" }, { tag: "img[src]" }]; },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const figure = document.createElement("figure"), image = document.createElement("img"), caption = document.createElement("figcaption");
      figure.contentEditable = "false";
      image.draggable = true;
      figure.append(image, caption);
      function sync(attrs: Record<string, unknown>) {
        figure.className = `blog-inline-image image-${attrs.align || "center"}`;
        figure.style.width = `${Number(attrs.width) || 800}px`;
        image.src = String(attrs.src || ""); image.alt = String(attrs.alt || "");
        image.style.width = "100%"; image.style.height = "auto";
        caption.textContent = String(attrs.caption || "");
      }
      sync(node.attrs);
      return new ResizableNodeView({
        element: figure, editor, node, getPos,
        onResize: width => { figure.style.width = `${width}px`; },
        onCommit: width => { const position = getPos(); if (position !== undefined) editor.chain().setNodeSelection(position).updateAttributes("image", { width: Math.round(width) }).run(); },
        onUpdate: updated => { if (updated.type !== node.type) return false; sync(updated.attrs); return true; },
        options: { min: { width: 50, height: 50 }, preserveAspectRatio: true },
      });
    };
  },
}).configure({ resize: { enabled: true, alwaysPreserveAspectRatio: true, minWidth: 50, minHeight: 50 } });

const ImageUpload = Node.create({
  name: "imageUpload", group: "block", atom: true,
  addAttributes() { return { id: { default: "" } }; },
  renderHTML() { return ["div", { class: "blog-upload-placeholder", role: "status" }, "در حال آپلود تصویر…"]; },
});

export function blogEditorExtensions() {
  return [StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false } }), TextStyleKit.configure({ lineHeight: false }), TextAlign.configure({ types: ["heading", "paragraph"], defaultAlignment: "right" }), Highlight.configure({ multicolor: true }), BlogImage, TableKit.configure({ table: { resizable: true } }), Direction, ImageUpload];
}
