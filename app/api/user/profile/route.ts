import { verifySession } from "@/lib/auth-helpers";
import { findUserById, updateUserProfile } from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    const session = await verifySession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const userId = session.user._id;

    // Filter out non-updatable fields (password, email, etc. cannot be updated through this endpoint)
    const {
      _id,
      password: _password, // Password updates must be done through a separate password change endpoint
      email, // Email cannot be changed through profile update
      createdAt,
      updatedAt,
      ...profileData
    } = body;

    // Update user profile
    const updatedUser = await updateUserProfile(userId, profileData);

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    // Return user without password
    const { password: _userPassword, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error: unknown) {
    console.error("Update profile error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update profile";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await verifySession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user._id;
    const user = await findUserById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error: unknown) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Failed to get profile" },
      { status: 500 }
    );
  }
}
