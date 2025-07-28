"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

const Navbar = () => {
  const router = useRouter();
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", e.target.value);

    const searchQuery = urlParams.toString();

    router.push(`/search?${searchQuery}`);
  };
  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div>
          <Link href="/" className="text-lg font-semibold">
            Zwatches
          </Link>
        </div>

        {/* Search Box */}
        <div className="relative w-32 md:w-64">
          {/* Icon inside input - LEFT SIDE */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add Product Button */}
        <div>
          <Link href="/add-product" className="cursor-pointer">
            <button className="bg-black text-white px-4 py-2 rounded cursor-pointer">
              Add Product
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
