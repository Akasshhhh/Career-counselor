"use client"

import { useSession } from "next-auth/react"

export function UserDashboard() {
  const { data: session } = useSession()

  return (
    <div className="p-4 border-b flex-shrink-0">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {session?.user?.name || 'User'}</h2>
        <p className="text-muted-foreground">How can we help with your career today?</p>
      </div>
    </div>
  )
}
