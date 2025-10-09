"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MoreHorizontal, Edit3, Trash2, ArrowLeft } from "lucide-react";
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

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { productId } = useParams() as { productId: string };

  useEffect(() => {
    if (!productId) return;
    axios
      .get(`/api/products/${productId}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/products/${productId}`);
      toast.success(response.data.message || "Product deleted successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting product");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-300 text-lg">
        Loading product details...
      </div>
    );

  return (
    <div className="px-4 md:px-12 py-10 bg-slate-900 text-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-8"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start justify-between bg-slate-800/60 p-6 rounded-2xl shadow-xl border border-slate-700 backdrop-blur-lg">
        {/* Product Image */}
        <div className="w-full md:w-[45%] relative group">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-2xl w-full h-[400px] object-cover group-hover:scale-[1.03] transition-transform duration-500 shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-[50%] relative">
          {/* 3-dot menu */}
          <div className="absolute top-0 right-0">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-slate-700 transition"
            >
              <MoreHorizontal size={22} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-3 bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-2 w-40 animate-fadeIn">
                <button
                  onClick={() => router.push(`/product/${product._id}/update`)}
                  className="flex items-center gap-2 w-full text-left text-blue-400 hover:text-blue-500 hover:bg-slate-700 p-2 rounded-lg transition"
                >
                  <Edit3 size={16} /> Update
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 w-full text-left text-red-500 hover:text-red-600 hover:bg-slate-700 p-2 rounded-lg transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2 mt-2">{product.name}</h1>
          <p className="text-xl font-semibold text-white mb-6">
            ${product.price}
          </p>

          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6 bg-gray-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:from-teal-600 hover:to-blue-700 transition"
          >
            Contact Seller
          </a>

          <div>
            <h2 className="font-semibold text-lg mb-2 border-b border-slate-700 pb-1">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Explore More Cars 🚗</h2>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
