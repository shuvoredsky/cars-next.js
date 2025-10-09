"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/fetch-products").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div id="product" className="px-4 md:px-12 py-10 min-h-screen">
      <h2 className="text-center text-3xl font-bold text-white mb-10">
        Featured Cars
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-slate-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="relative overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="p-5 text-white flex flex-col justify-between h-[180px]">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-400 mt-1 line-clamp-2 text-sm">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="text-lg font-bold text-white">${product.price}</p>
                <Link
                  href={`/product/${product._id}`}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
