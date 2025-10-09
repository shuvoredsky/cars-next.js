"use client";

import { Car, Users, ShieldCheck, Rocket, Star } from "lucide-react";
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-600 text-white px-6 md:px-16 py-12">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-white bg-clip-text text-transparent">
          About Next Car
        </h1>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
          Next Car is a modern platform designed to provide verified car data,
          authentic reviews, and a seamless browsing experience for car
          enthusiasts. Whether you are planning to buy, sell, or simply explore
          vehicles, we’ve got you covered.
        </p>
      </div>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto bg-slate-800/50 border border-slate-700 backdrop-blur-lg rounded-2xl p-8 shadow-xl mb-16">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Car className="text-teal-400" /> Our Mission
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Our mission is to build a transparent and community-driven car
          information hub where users can share, edit, and manage authentic car
          data. Registered users can add, update, and delete verified vehicles
          to help keep the platform accurate and reliable for everyone.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">✨ Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="text-teal-400 w-8 h-8" />,
              title: "Community Driven",
              desc: "Users can share real vehicle information and help others make better decisions.",
            },
            {
              icon: <ShieldCheck className="text-blue-400 w-8 h-8" />,
              title: "Secure Authentication",
              desc: "NextAuth provides a secure login system using Google and email credentials.",
            },
            {
              icon: <Star className="text-yellow-400 w-8 h-8" />,
              title: "Verified Data",
              desc: "All data is managed by verified users to ensure authenticity.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="max-w-5xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-xl backdrop-blur-lg mb-16">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Rocket className="text-purple-400" /> Technology Stack
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-300 mt-4">
          <li>⚙️ Next.js (v15+)</li>
          <li>⚛️ React (v19)</li>
          <li>🎨 TailwindCSS (v4)</li>
          <li>🗄️ MongoDB + Mongoose</li>
          <li>🔐 NextAuth v5</li>
          <li>☁️ Cloudinary for image upload</li>
          <li>🧾 TypeScript for type safety</li>
        </ul>
      </section>

      {/* Future Vision */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">🚀 Future Vision</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
          We plan to add advanced <strong>search and filter features</strong>, a
          complete <strong>rating and review system</strong>, and an{" "}
          <strong>Admin Dashboard</strong> to make Next Car even more powerful
          and user-friendly.
        </p>
      </section>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-400 text-sm border-t border-slate-800 pt-6">
        © {new Date().getFullYear()} Next Car. Built by{" "}
        <span className="text-teal-400 font-semibold">Shuvo Chakrabrati</span>{" "}
        💻
      </div>
    </div>
  );
};

export default AboutPage;
