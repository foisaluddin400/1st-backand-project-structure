import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subName: { type: String, required: true },
    subDescription: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("SubCategory", subCategorySchema);
