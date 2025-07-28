// app/api/products/[productId]/route.ts

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
