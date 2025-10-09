"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-slate-700 rounded-xl p-4 shadow-md flex flex-col gap-3"
        >
          <div className="h-48 bg-slate-600 rounded-lg"></div>
          <div className="h-5 bg-slate-600 rounded w-3/4"></div>
          <div className="h-4 bg-slate-600 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

function SearchResults() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchTermFormUrl = searchParams.get("searchTerm");

    if (searchTermFormUrl) {
      setLoading(true);
      axios
        .get(`/api/search?searchTerm=${searchTermFormUrl}`)
        .then((res) => setProducts(res.data.productCon))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        )
        .finally(() => setLoading(false));
    }
  }, [searchParams]);

  const searchTerm = searchParams.get("searchTerm");

  return (
    <div className="min-h-screen bg-slate-600 text-white py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Search Results for <span className="text-teal-400">“{searchTerm}”</span>
      </h1>

      {loading ? (
        <LoadingSkeleton />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No products found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-lg hover:shadow-teal-400/30 transition transform hover:-translate-y-1"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-56 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-300 text-sm">${product.price}</p>
                <Link href={`/product/${product._id}`}>
                  <button className="mt-3 w-full bg-slate-500 text-white py-2 rounded-lg transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-xl animate-pulse">
          Loading search results...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
