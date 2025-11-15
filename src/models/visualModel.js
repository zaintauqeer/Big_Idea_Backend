import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Visual", aboutSchema);
