import { NextResponse } from "next/server";
import Product from "@/app/api/models/product.model";
import { connectDB } from "@/app/api/db/connectDB";

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const products = await Product.find({ userEmail: email });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
