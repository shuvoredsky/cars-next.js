"use client";

import { Search } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", e.target.value);

    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/signUp");
    toast.success("logged out successfully.");
  };

  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white border-b-1">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div>
          <Link href="/" className="text-lg font-semibold">
            Next Car
          </Link>
        </div>

        {/* Search Box */}
        <div className="relative w-32 md:w-64">
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

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Add Product */}
          <Link href="/add-product">
            <button className="bg-black text-white px-4 py-2 rounded">
              Add Product
            </button>
          </Link>

          {/* Sign In */}
          <Link href="/signIn">
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-300">
              Sign In
            </button>
          </Link>

          {/* Sign Up */}
          <Link href="/signUp">
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700">
              Sign Up
            </button>
          </Link>
          <Link href="/signUp">
            <button
              onClick={handleSignOut}
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Log Out
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
