"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Signup failed");
      }

      toast.success("User registered successfully!");
      router.push("/signIn");
    } catch (error: any) {
      toast.error(error.message); // Alert er bodole toast use korchi
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-200"
      style={{ background: "#E5E7EB" }}
    >
      <div
        className="max-w-md w-full mx-auto mt-6 sm:mt-8 md:mt-12 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg relative"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(156, 163, 175, 0.5)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-700">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-silver-500 bg-white/80"
              style={{ borderColor: "#9CA3AF" }}
            />
            {errors.username && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                Username is required
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-silver-500 bg-white/80"
              style={{ borderColor: "#9CA3AF" }}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                Email is required
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-silver-500 bg-white/80 text-black"
              style={{ borderColor: "#9CA3AF" }}
            />
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                Password is required
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 sm:py-3 rounded-lg text-white transition duration-300 bg-slate-400"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm mb-2 text-gray-600">Or sign up with</p>
          <button
            onClick={handleGoogleSignup}
            className="w-full py-2 sm:py-3 rounded-lg text-white transition bg-slate-400"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
