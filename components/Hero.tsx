import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[70vh] md:min-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-slate-800 px-4 md:px-12 text-black">
      <div className="max-w-2xl">
        <h1 className="text-5xl pt-6 md:pt-0 md:text-7xl leading-tight font-semibold text-white">
          Unleash the Power of the Road
        </h1>
        <p className="text-white mt-4">
          Explore our premium collection of cars, designed for those who crave
          performance, style, and innovation. From sleek sedans to powerful
          SUVs, find your perfect ride today.
        </p>

        <Link href="#product">
          <button className="mt-8 bg-slate-400 font-semibold text-white px-3 py-2 rounded-md">
            Browse Our Fleet
          </button>
        </Link>
      </div>
      <div>
        <Image
          src="/watch-hero.png"
          alt="hero image"
          width={500}
          height={500}
        ></Image>
      </div>
    </div>
  );
};

export default Hero;
