import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

interface RequestBody {
  token: string
  password: string
}

export async function POST(request: Request) {
  try {
    const { token, password }: RequestBody = await request.json()

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Find the reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    // Check if token exists and is not expired
    if (!resetToken || new Date() > resetToken.expires) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })

    // Delete the used token
    await prisma.passwordResetToken.delete({
      where: { token },
    })

    // Invalidate all user sessions (optional)
    await prisma.session.deleteMany({
      where: { userId: user.id },
    })

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("[RESET_PASSWORD_ERROR]", error)
    return NextResponse.json(
      { error: "An error occurred while resetting your password" },
      { status: 500 }
    )
  }
}
