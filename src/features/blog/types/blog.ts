import type { JSONContent } from "@tiptap/core";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  cover: string;
  coverAlt: string;
  content: JSONContent;
  readMinutes: number;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostSummary = Omit<BlogPost, "content">;

export interface BlogActionState {
  success?: boolean;
  message?: string;
  id?: string;
  slug?: string;
  updatedAt?: string;
}

export interface BlogComment {
  _id: string;
  post: { _id: string; title: string; slug: string } | null;
  name: string;
  text: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
