"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/productCard";

// Define the Product interface based on your schema
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
  const [products, setProducts] = useState<Product[]>([]); // Type as array of Product
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

  if (loading) return <p>Loading...</p>;
  if (!session?.user?.email) return <p>Please log in to view your products.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
