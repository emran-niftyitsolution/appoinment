import { findUserByEmail } from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find user
    const user = await findUserByEmail(email.toLowerCase());
    if (!user) {
      // Don't reveal if user exists for security
      return NextResponse.json(
        { message: "If the email exists, a password reset link has been sent" },
        { status: 200 }
      );
    }

    // TODO: In production, send an email with a reset token/link
    // For now, we'll just return a success message
    // You can integrate with services like SendGrid, Resend, or Nodemailer

    return NextResponse.json(
      {
        message:
          "If the email exists, a password reset link has been sent to your email",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}
