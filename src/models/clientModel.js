import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  logoUrl: {
    type: String,
    required: true,
  },
  logoPublicId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);
