"use server";

import { connectDB } from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import mongoose from "mongoose";
import Product from "@/app/api/models/product.model";

export async function addAction(formData: FormData) {
  try {
    const image = formData.get("image") as File;
    const name = formData.get("name")?.toString();
    const price = formData.get("price")?.toString();
    const link = formData.get("link")?.toString();
    const description = formData.get("description")?.toString();
    const userName = formData.get("userName")?.toString();
    const userEmail = formData.get("userEmail")?.toString();

    // Debug: Log received data
    console.log("Received form data:", {
      image: image?.name,
      name,
      price,
      link,
      description,
      userName,
      userEmail,
    });

    if (
      !image ||
      !name ||
      !price ||
      !link ||
      !description ||
      !userName ||
      !userEmail
    ) {
      console.log("Missing fields:", {
        image,
        name,
        price,
        link,
        description,
        userName,
        userEmail,
      });
      return { error: "All fields are required" };
    }

    await connectDB();

    // Debug: Check MongoDB connection
    console.log("MongoDB connected:", mongoose.connection.readyState === 1);

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

    console.log("Image upload response:", imageResponse);

    // Store in DB
    const product = await Product.create({
      image: (imageResponse as any).secure_url,
      name,
      price: parseFloat(price),
      link,
      description,
      userName,
      userEmail,
    });
    console.log("Product created:", product);

    return { success: "Product added successfully" };
  } catch (error) {
    console.error("Add product error:", error); // Log full error stack
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
