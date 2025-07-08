import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    funnyIncident: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Memory", memorySchema);
