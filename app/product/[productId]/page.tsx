"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import ProductList from "@/components/ProductList";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  link: string;
}

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/products/${params.productId}`);
      toast.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting product");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/products/${params.productId}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error("Error fetching product:", err));
  }, [params.productId]);

  if (!product) return <p className="p-8">Loading...</p>;

  return (
    <div className="px-4 md:px-12 py-6">
      <button onClick={() => router.push("/")} className="text-sm mb-4">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        {/* Left - Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg w-full md:w-[500px] object-cover"
        />

        {/* Right - Info */}
        <div className="w-full md:w-1/2 relative">
          {/* 3-dot menu */}
          <div className="absolute top-0 right-0">
            <button onClick={() => setShowMenu(!showMenu)} className="text-2xl">
              <MoreHorizontal />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2 z-10">
                <button
                  className="block text-gray-800 hover:underline"
                  onClick={() => router.push(`/product/${product._id}/update`)}
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="block text-red-600 hover:underline mt-2"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${product.price}</p>

          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Contact Seller
          </a>

          <h2 className="font-semibold text-lg mb-1">Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
      <ProductList></ProductList>
    </div>
  );
};

export default ProductDetailsPage;
