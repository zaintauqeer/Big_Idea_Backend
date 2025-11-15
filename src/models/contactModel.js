import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  phone: {
    type: [String],
    required: true,
  },
  email: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
