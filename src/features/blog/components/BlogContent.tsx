import { createElement, Fragment, type ReactNode, type CSSProperties } from "react";
import Image from "next/image";
import type { JSONContent } from "@tiptap/core";
import { validateBlogContent } from "@/lib/blogContent";

export default function BlogContent({ content }: { content: JSONContent }) {
  const document = validateBlogContent(content);
  let heading = 0;
  function render(node: JSONContent, key: number): ReactNode {
    const a = node.attrs ?? {};
    const children = node.content?.map(render);
    if (node.type === "text") {
      let result: ReactNode = node.text;
      for (const mark of node.marks ?? []) {
        const attrs = mark.attrs ?? {};
        const tag = ({ bold: "strong", italic: "em", underline: "u", strike: "s", code: "code", link: "a", highlight: "mark", textStyle: "span" } as Record<string, string>)[mark.type];
        const props: Record<string, unknown> = mark.type === "link" ? { href: attrs.href, rel: "noopener noreferrer" } : mark.type === "highlight" ? { style: { backgroundColor: attrs.color } } : mark.type === "textStyle" ? { style: { color: attrs.color, backgroundColor: attrs.backgroundColor, fontSize: attrs.fontSize, fontFamily: attrs.fontFamily === "inherit" ? undefined : attrs.fontFamily } } : {};
        result = createElement(tag, props, result);
      }
      return <Fragment key={key}>{result}</Fragment>;
    }
    if (node.type === "image") return <figure key={key} className={`blog-inline-image image-${a.align}`} style={{ width: `${a.width}px` }}><Image src={a.src} alt={a.alt} width={Number(a.width)} height={Math.round(Number(a.width) * .65)} sizes="(max-width: 800px) 100vw, 800px" style={{ width: "100%", height: "auto" }} />{a.caption && <figcaption>{a.caption}</figcaption>}</figure>;
    if (node.type === "doc") return <Fragment key={key}>{children}</Fragment>;
    if (node.type === "horizontalRule") return <hr key={key} />;
    if (node.type === "hardBreak") return <br key={key} />;
    if (node.type === "codeBlock") return <pre dir="ltr" key={key}><code>{children}</code></pre>;
    if (node.type === "table") return <div key={key} className="blog-table-scroll"><table><tbody>{children}</tbody></table></div>;
    const tag = node.type === "heading" ? `h${a.level}` : ({ paragraph: "p", bulletList: "ul", orderedList: "ol", listItem: "li", blockquote: "blockquote", tableRow: "tr", tableCell: "td", tableHeader: "th" } as Record<string, string>)[node.type ?? ""];
    const props: Record<string, unknown> = { key };
    if (node.type === "heading") props.id = `heading-${++heading}`;
    if (["paragraph", "heading"].includes(node.type ?? "")) { props.dir = a.dir; props.style = { textAlign: a.textAlign } as CSSProperties; }
    if (["tableCell", "tableHeader"].includes(node.type ?? "")) {
      props.colSpan = a.colspan; props.rowSpan = a.rowspan;
      if (Array.isArray(a.colwidth)) props.style = { width: a.colwidth.reduce((sum: number, width: number) => sum + width, 0) };
    }
    if (node.type === "orderedList") props.start = a.start;
    return createElement(tag, props, children);
  }
  return <div className="blog-prose" dir="rtl">{render(document, 0)}</div>;
}
