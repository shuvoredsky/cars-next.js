import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default product;
