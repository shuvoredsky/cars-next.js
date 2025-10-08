"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // if (status === "loading") {
  //   return (
  //     <nav className="p-4 text-center text-gray-500 bg-gray-100">
  //       Loading...
  //     </nav>
  //   );
  // }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", query);
    router.push(`/search?${urlParams.toString()}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/signIn" });
      toast.success("Logged out successfully.");
    } catch {
      toast.error("Failed to log out.");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-3 sm:px-6 md:px-10 lg:px-16 py-3 sm:py-4 backdrop-blur-lg border-b border-gray-300  bg-gray-400">
      <div className="flex flex-wrap gap-3 sm:gap-0 justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
        >
          Next Car
        </Link>

        <div className="relative w-full sm:w-48 md:w-64 lg:w-80 order-3 sm:order-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-600" />
          </div>
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search cars..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-500 bg-transparent placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 order-2 sm:order-3">
          {status === "authenticated" && user ? (
            <>
              <Link href="/add-product" className="hidden sm:block">
                <button className="px-3 sm:px-4 py-2 rounded-lg text-white font-semibold bg-slate-500 hover:bg-slate-700 transition">
                  Add Product
                </button>
              </Link>

              <Link href="/my-products" className="hidden sm:block">
                <button className="px-3 sm:px-4 py-2 rounded-lg text-white font-semibold bg-slate-500 hover:bg-slate-700 transition">
                  My Products
                </button>
              </Link>

              <div className="relative" ref={dropdownRef}>
                <img
                  src={user.image ?? "/default-avatar.png"}
                  alt="User profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 shadow-lg rounded-lg py-2 z-50 backdrop-blur-md border border-gray-200">
                    <p className="px-4 py-2 text-gray-800 font-medium border-b border-gray-200">
                      {user.name || "User"}
                    </p>
                    <Link href="/add-product" className="block sm:hidden">
                      <button className="w-full text-left px-4 py-2 text-white font-semibold bg-slate-500 hover:bg-slate-700 transition">
                        Add Product
                      </button>
                    </Link>
                    <Link href="/my-products" className="block sm:hidden">
                      <button className="w-full text-left px-4 py-2 text-white font-semibold bg-slate-500 hover:bg-slate-700 transition">
                        My Products
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
              <Link href="/signIn">
                <button className="px-3 sm:px-4 py-2 rounded-lg text-white font-semibold bg-slate-500 hover:bg-slate-700 transition">
                  Sign In
                </button>
              </Link>
              <Link href="/signUp">
                <button className="px-3 sm:px-4 py-2 rounded-lg text-white font-semibold bg-slate-500 hover:bg-slate-700 transition">
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
