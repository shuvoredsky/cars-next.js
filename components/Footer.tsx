"use client";

import React from "react";
import { Facebook, Twitter, Instagram, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Brand Info */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
            Next Car
          </Link>
          <p className="text-xs sm:text-sm text-gray-300">
            Your trusted platform for car information and management. Explore,
            add, and share car details seamlessly.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition"
          >
            <ArrowUp className="w-3 sm:w-4 h-3 sm:h-4" />
            Back to Top
          </button>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Connect With Us
          </h3>
          <div className="flex gap-3 sm:gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Facebook className="w-5 sm:w-6 h-5 sm:h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Twitter className="w-5 sm:w-6 h-5 sm:h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Instagram className="w-5 sm:w-6 h-5 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Subscribe
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
            Get the latest car updates delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 sm:px-4 py-2 sm:py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm w-full"
            />
            <button
              type="submit"
              className="px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-1 sm:gap-2"
            >
              <Mail className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="text-xs sm:text-sm">Subscribe</span>
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 sm:mt-8 border-t border-gray-700 pt-4 text-center text-xs sm:text-sm text-gray-300">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/your-github-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            Shuvo Chakrabarti
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} Next Car. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
