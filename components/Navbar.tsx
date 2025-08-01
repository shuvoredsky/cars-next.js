"use client";

import { Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", e.target.value);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/signUp");
      toast.success("Logged out successfully.");
      setIsDropdownOpen(false); // Close dropdown on sign out
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 sm:px-6 md:px-12 py-4 ">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Next Car
        </Link>

        {/* Search Box */}
        <div className="relative w-40 sm:w-48 md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search cars..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Action Buttons / User Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {status === "authenticated" && user ? (
            <>
              {/* Add Product (Hidden on mobile, shown on tablet+) */}
              <Link href="/add-product" className="hidden sm:block">
                <button className="text-white bg-black px-4 py-2 rounded-lg  transition">
                  Add Product
                </button>
              </Link>

              {/* User Profile */}
              <div className="relative">
                <img
                  src={user.image || "https://via.placeholder.com/40"}
                  alt="User profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                    <p className="px-4 py-2 text-gray-800 font-medium border-b border-gray-200">
                      {user.name || "User"}
                    </p>
                    <Link href="/add-product" className="block sm:hidden">
                      <button className="w-full text-left px-4 py-2 text-white bg-black">
                        Add Product
                      </button>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link href="/signIn">
                <button className="text-white bg-black px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                  Sign In
                </button>
              </Link>

              {/* Sign Up */}
              <Link href="/signUp">
                <button className="text-white bg-black px-3 sm:px-4 py-2 rounded-lg transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
