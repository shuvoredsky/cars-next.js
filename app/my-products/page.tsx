"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/productCard";
import Lottie from "lottie-react";
import NotFoundCar from "@/public/notFoundCar.json";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  link: string;
  description: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function MyProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProducts = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(
            `/api/my-products?email=${session.user.email}`
          );
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMyProducts();
  }, [session]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        <p className="text-lg animate-pulse">Loading your products...</p>
      </div>
    );

  if (!session?.user?.email)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        <p className="text-xl font-semibold">
          Please log in to view your products.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          My Products
        </h1>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-sm">
              <Lottie animationData={NotFoundCar} loop={true} />
            </div>
            <h2 className="text-2xl font-semibold mt-4">No Products Found</h2>
            <p className="text-gray-400 mt-2 max-w-md">
              You haven’t added any products yet. Once you upload or list a
              product, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
