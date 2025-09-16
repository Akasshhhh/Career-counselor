"use client"

import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <LoginForm onToggleMode={() => router.push('/signup')} />
    </div>
  )
}
