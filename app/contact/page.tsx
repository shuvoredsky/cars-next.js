"use client";

import React from "react";
import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-600 text-white px-6 md:px-16 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-white bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          I’d love to connect! Whether you have a question, a collaboration
          idea, or just want to say hello — feel free to reach out through any
          of the platforms below.
        </p>
      </div>

      {/* Contact Info Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email */}
        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 shadow-md hover:shadow-teal-500/20 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <Mail className="text-teal-400 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <Link
                href="mailto:kumarshuvo265@gmail.com"
                className="text-gray-300 hover:text-teal-400 transition"
              >
                kumarshuvo265@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 shadow-md hover:shadow-teal-500/20 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <Phone className="text-blue-400 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <Link
                href="tel:+8801732629543"
                className="text-gray-300 hover:text-teal-400 transition"
              >
                +880 1732-629543
              </Link>
            </div>
          </div>
        </div>

        {/* GitHub */}
        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 shadow-md hover:shadow-teal-500/20 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <Github className="text-gray-200 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">GitHub</h3>
              <Link
                href="https://github.com/shuvoredsky"
                target="_blank"
                className="text-gray-300 hover:text-teal-400 transition"
              >
                github.com/shuvoredsky
              </Link>
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 shadow-md hover:shadow-teal-500/20 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <Linkedin className="text-blue-500 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">LinkedIn</h3>
              <Link
                href="https://linkedin.com/in/shuvoredsky"
                target="_blank"
                className="text-gray-300 hover:text-teal-400 transition"
              >
                linkedin.com/in/shuvoredsky
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 shadow-md hover:shadow-teal-500/20 hover:scale-105 transition-transform duration-300 md:col-span-2">
          <div className="flex items-center gap-4">
            <Globe className="text-purple-400 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Portfolio Website</h3>
              <Link
                href="https://shuvoredsky.netlify.app/"
                target="_blank"
                className="text-gray-300 hover:text-teal-400 transition"
              >
                shuvoredsky.netlify.app
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
