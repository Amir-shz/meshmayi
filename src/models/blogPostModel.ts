import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 180 },
  slug: { type: String, required: true, unique: true, maxlength: 200 },
  summary: { type: String, default: "", maxlength: 500 },
  category: { type: String, default: "", maxlength: 60 },
  cover: { type: String, default: "" },
  coverAlt: { type: String, default: "", maxlength: 200 },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  readMinutes: { type: Number, default: 1 },
  status: { type: String, enum: ["draft", "published"], default: "draft", required: true },
  publishedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });
schema.index({ status: 1, deletedAt: 1, publishedAt: -1 });
const BlogPost = (mongoose.models.BlogPost as mongoose.Model<mongoose.InferSchemaType<typeof schema>> | undefined) ?? mongoose.model("BlogPost", schema);
export default BlogPost;
