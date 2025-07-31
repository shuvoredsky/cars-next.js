// app/api/products/[productId]/route.ts
import cloudinary from "@/utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import product from "../../models/product.model";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  await connectDB();

  const { productId } = params;

  try {
    const singleProduct = await product.findById(productId);

    if (!singleProduct) {
      return Response.json({ message: "Product not found." }, { status: 404 });
    }

    return Response.json({ product: singleProduct }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  await connectDB();

  const { productId } = params;
  try {
    const delToProduct = await product.findById(productId);
    if (!delToProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    // Delete the image from Cloudinary
    const parts = delToProduct.image.split("/");
    const fileName = parts[parts.length - 1];
    const imageId = fileName.split(".")[0];
    await cloudinary.uploader
      .destroy(`my-app/${imageId}`)
      .then((result) => console.log("Image delete result:", result));

    // Delete from database
    await product.findByIdAndDelete(productId);

    return Response.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
