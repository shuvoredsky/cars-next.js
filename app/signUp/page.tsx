// app/signup/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function SignUpPage() {
  const { data } = useSession();
  const session = data;
  console.log("session:", session);
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

      alert("User registered successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-md rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">Username is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm mb-2">Or sign up with</p>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}
