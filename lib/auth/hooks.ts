"use client"

import { signIn, signOut as nextAuthSignOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    })

    if (result && (result as any).error) {
      throw new Error((result as any).error)
    }
  }

  const handleSignUp = async (email: string, password: string, name: string) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    // Sign in the user after successful signup
    await handleSignIn(email, password)
  }

  const handleSignOut = async () => {
    await nextAuthSignOut({ redirect: true, callbackUrl: "/login" })
  }

  return {
    user: session?.user || null,
    isLoading: status === "loading",
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  }
}
