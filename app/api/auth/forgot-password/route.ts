import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { randomBytes } from "crypto"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface RequestBody {
  email: string
}

export async function POST(request: Request) {
  try {
    const { email }: RequestBody = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true },
    })

    // Return success even if user doesn't exist to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: "If an account exists with this email, you will receive a password reset link" },
        { status: 200 }
      )
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = randomBytes(32).toString("hex")
    const expires = new Date()
    expires.setHours(expires.getHours() + 1)

    // Store the reset token in the database
    await prisma.passwordResetToken.upsert({
      where: { email },
      update: {
        token: resetToken,
        expires,
      },
      create: {
        email,
        token: resetToken,
        expires,
      },
    })

    // Send password reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
    
    try {
      await resend.emails.send({
        from: `Career Chat <no-reply@${process.env.RESEND_DOMAIN || 'example.com'}>`,
        to: email,
        subject: "Reset your password",
        html: `
          <div>
            <h1>Reset your password</h1>
            <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
            <p><a href="${resetUrl}">Reset Password</a></p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("[EMAIL_ERROR]", emailError)
      return NextResponse.json(
        { error: "Failed to send password reset email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "If an account exists with this email, you will receive a password reset link" },
      { status: 200 }
    )
  } catch (error) {
    console.error("[FORGOT_PASSWORD_ERROR]", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}
