"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      if (res?.error) {
        toast.error(res.error);
        throw new Error(res.error);
      }
      toast.success("Login Successfully!");
      window.location.href = res?.url || "/";
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#E5E7EB" }}
    >
      <div
        className="max-w-md w-full mx-auto mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg relative"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(156, 163, 175, 0.5)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-700">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                Require Email
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base font-medium text-black">
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
                Require Password
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 sm:py-3 rounded-lg font-semibold transition duration-300 bg-slate-400 text-white"
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
