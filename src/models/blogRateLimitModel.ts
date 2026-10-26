import mongoose from "mongoose";

const schema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
});
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const BlogRateLimit = (mongoose.models.BlogRateLimit as mongoose.Model<mongoose.InferSchemaType<typeof schema>> | undefined) ?? mongoose.model("BlogRateLimit", schema);
export default BlogRateLimit;
