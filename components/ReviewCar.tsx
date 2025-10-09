"use client";

import React from "react";
import Lottie from "lottie-react";
import Link from "next/link";
import CarReviewAni from "@/public/check-car.json";

const ReviewCar: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-b from-slate-700 text-white py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left: Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Review the Car Before You Decide
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Buying a car is a big decision. Use our checklist and expert tips to
            inspect the vehicle carefully — from mechanical condition to
            ownership history — so you can make an informed, confident choice.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="inline-block bg-teal-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                ✓
              </span>
              <div>
                <p className="font-semibold">Visual & Exterior Check</p>
                <p className="text-gray-400 text-sm">
                  Look for rust, paint inconsistencies, dents and panel gaps.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="inline-block bg-teal-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                ✓
              </span>
              <div>
                <p className="font-semibold">Mechanical & Test Drive</p>
                <p className="text-gray-400 text-sm">
                  Check engine sound, transmission shifts, brakes & suspension.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="inline-block bg-teal-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                ✓
              </span>
              <div>
                <p className="font-semibold">Documents & Ownership</p>
                <p className="text-gray-400 text-sm">
                  Verify registration, service history, and any accident
                  records.
                </p>
              </div>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/about"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-black font-semibold px-5 py-2.5 rounded-lg transition"
            >
              Learn How to Inspect
            </Link>

            <Link
              href="/contact"
              className="inline-block border border-slate-700 text-white px-5 py-2.5 rounded-lg hover:bg-slate-700 transition"
            >
              Contact an Expert
            </Link>
          </div>
        </div>

        {/* Right: Lottie Animation */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Lottie
              animationData={CarReviewAni}
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCar;
