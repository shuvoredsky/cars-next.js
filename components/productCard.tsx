"use client";

import Image from "next/image";

// Define Product interface locally
export interface Product {
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

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm mt-2">{product.description.substring(0, 100)}...</p>
    </div>
  );
}
