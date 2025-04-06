const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  status: {
    type: String,
    enum: ["approved", "needs_changes", "pending"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
