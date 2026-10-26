import mongoose from "mongoose";

const schema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "BlogPost", required: true },
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  text: { type: String, required: true, trim: true, minlength: 5, maxlength: 2000 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", required: true },
}, { timestamps: true });
schema.index({ post: 1, status: 1, createdAt: -1 });
schema.index({ status: 1, createdAt: -1 });
const BlogComment = (mongoose.models.BlogComment as mongoose.Model<mongoose.InferSchemaType<typeof schema>> | undefined) ?? mongoose.model("BlogComment", schema);
export default BlogComment;
