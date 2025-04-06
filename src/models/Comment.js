import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
