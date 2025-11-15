import mongoose from "mongoose";

const footerLogoSchema = new mongoose.Schema({
  name: {
    type: String, // jaise "Instagram"
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  logoPublicId: {
    type: String,
    required: true,
  },
  link: {
    type: String, // optional: insta/twitter ka URL
    required: false,
  }
}, { timestamps: true });

export default mongoose.model("FooterLogo", footerLogoSchema);
