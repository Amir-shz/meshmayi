import type { getProductComments } from "@/services/apiComments";

export default async function ProductCommentCount({ result }: { result: Promise<Awaited<ReturnType<typeof getProductComments>> | undefined> }) {
  const data = await result;
  return <span className="comments-count">{data ? data.count.toLocaleString("fa-IR") : "—"} دیدگاه</span>;
}
