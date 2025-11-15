import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  logoUrl: {
    type: String,
    required: true,
  },
  public_id: { type: String, required: true },
});

const Logo = mongoose.model("Logo", logoSchema);
export default Logo;
