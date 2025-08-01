"use server";
import { connectDB } from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import product, { productSchema } from "@/app/api/models/product.model";
import mongoose from "mongoose";

// Ensure single model instance
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export async function updateAction(formData: FormData, id: string) {
  try {
    const image = formData.get("image") as File;
    const name = formData.get("name")?.toString();
    const price = formData.get("price")?.toString();
    const link = formData.get("link")?.toString();
    const description = formData.get("description")?.toString();

    if (!image || !name || !price || !link || !description) {
      return { error: "All fields are required" };
    }

    await connectDB();

    const upToDateProduct = await product.findById(id);
    if (!upToDateProduct) {
      return {
        error: "No Product found",
      };
    }

    if (image.size === 0) {
      await product.findByIdAndUpdate(id, {
        name,
        price,
        link,
        description,
      });
      return {
        success: "product updated successfully",
      };
    } else {
      // delete the previous img first
      const parts = upToDateProduct.image.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];
      cloudinary.uploader
        .destroy(`my-app/${imageId}`)
        .then((result) => console.log("result", result));

      // Image processing
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imageResponse: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto", folder: "my-app" },
            (error, result) => (error ? reject(error) : resolve(result))
          )
          .end(buffer);
      });

      // Store in DB
      await Product.findByIdAndUpdate(id, {
        image: (imageResponse as any).secure_url,
        name,
        price: parseFloat(price), // Convert string to number
        link,
        description,
      });
      return { success: "Product added successfully" };
    }
  } catch (error) {
    console.error("Add product error:", error); // Log detailed error
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
