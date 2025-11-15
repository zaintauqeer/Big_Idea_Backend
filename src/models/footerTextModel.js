import mongoose from "mongoose";

const footerTextSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("FooterText", footerTextSchema);
