export type CommentStatus = "pending" | "approved" | "rejected";

export interface ProductComment {
  _id: string;
  name: string;
  text: string;
  createdAt: string;
}

export interface AdminComment extends ProductComment {
  car: { _id: string; name: string } | null;
  status: CommentStatus;
}

export interface CommentFormState {
  success?: boolean;
  message?: string;
  errors?: { name?: string; text?: string };
}
