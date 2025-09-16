"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import { useState, useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to login if not authenticated
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        {isLoginMode ? (
          <LoginForm onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <SignupForm onToggleMode={() => setIsLoginMode(true)} />
        )}
      </div>
    )
  }

  return <>{children}</>
}
