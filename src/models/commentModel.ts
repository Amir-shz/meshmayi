import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  text: { type: String, required: true, trim: true, minlength: 5, maxlength: 2000 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", required: true },
}, { timestamps: true });

commentSchema.index({ car: 1, status: 1, createdAt: -1 });
commentSchema.index({ status: 1, createdAt: -1 });

const Comment = (mongoose.models.Comment as mongoose.Model<mongoose.InferSchemaType<typeof commentSchema>> | undefined)
  ?? mongoose.model("Comment", commentSchema);
export default Comment;
