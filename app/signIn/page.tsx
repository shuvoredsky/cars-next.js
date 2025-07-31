// app/signin/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/dashboard"); // তুমি চাইলে তোমার হোম বা অন্য পেজে পাঠাতে পারো
    } else {
      alert("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
