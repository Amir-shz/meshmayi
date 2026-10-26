import mongoose from "mongoose";

const schema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "BlogPost", required: true },
  voter: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });
schema.index({ post: 1, voter: 1 }, { unique: true });
const BlogVote = (mongoose.models.BlogVote as mongoose.Model<mongoose.InferSchemaType<typeof schema>> | undefined) ?? mongoose.model("BlogVote", schema);
export default BlogVote;
