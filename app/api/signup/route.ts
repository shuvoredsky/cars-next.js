import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { connectDB } from "../db/connectDB";
import User from "../models/User";

connectDB();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Requre Email and Password" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return NextResponse.json(
      { message: "User registered Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("SignUp error:", error.message);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "This email already registered" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Failed to Signup" }, { status: 500 });
  }
}
