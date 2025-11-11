import { generateToken } from "@/lib/auth";
import { createUser } from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, password, userType } = body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !userType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (userType !== "patient" && userType !== "doctor") {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 });
    }

    // Create user
    const user = await createUser({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password,
      userType,
    });

    // Generate token
    const token = generateToken({
      userId: user._id!,
      email: user.email,
      userType: user.userType,
    });

    // Create response
    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          userType: user.userType,
        },
      },
      { status: 201 }
    );

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}
