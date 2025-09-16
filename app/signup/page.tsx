"use client"

import { useRouter } from "next/navigation"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SignupForm onToggleMode={() => router.push('/login')} />
    </div>
  )
}
