import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";

// ✅ GET
export async function GET(request: NextRequest, { params }: any) {
  try {
    await connectDB();
    const { productId } = params;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const singleProduct = await Product.findById(productId).lean();

    if (!singleProduct) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: singleProduct }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    await connectDB();
    const { productId } = params;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const productToDelete = await Product.findById(productId);

    if (!productToDelete) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const imageUrl = productToDelete.image;
    if (imageUrl) {
      const parts = imageUrl.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];

      await cloudinary.uploader.destroy(`my-app/${imageId}`);
    }

    await Product.findByIdAndDelete(productId);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
