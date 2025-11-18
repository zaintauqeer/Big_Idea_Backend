import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    titleColor: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    thumbnailPublicId: {
      type: String,
      required: true,
    },
    mainImageUrl: {
      type: String,
      required: true,
    },
    mainImagePublicId: {
      type: String,
      required: true,
    },
    showRoom: [
      {
        _id: false,
        imageUrl: {
          type: String,
          required: true,
        },
        imagePublicId: {
          type: String,
          required: true,
        }
      }
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
