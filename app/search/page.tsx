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

function SearchResults() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchTermFormUrl = searchParams.get("searchTerm");
    if (searchTermFormUrl) {
      axios
        .get(`/api/search?searchTerm=${searchTermFormUrl}`)
        .then((res) => setProducts(res.data.productCon))
        .catch((error) =>
          console.log("Error fetching search results: ", error)
        );
    }
  }, [searchParams]);

  return (
    <div
      id="product"
      className="px-4 md:px-12 py-5 md:py-10 flex justify-center items-center gap-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <Image
              src={product.image}
              alt="img"
              width={400}
              height={400}
              className="max-w-[17rem] h-72 object-cover object-center rounded-lg"
            />
            <div className="mt-4">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="font-medium text-sm mt-1">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
