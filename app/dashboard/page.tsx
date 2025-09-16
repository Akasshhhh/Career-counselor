"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { SessionSidebar } from "@/components/chat/session-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { UserDashboard } from "@/components/chat/user-dashboard"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { status } = useSession()
  const [selectedSessionId, setSelectedSessionId] = useState<string>()

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="h-full flex justify-center bg-background md:overflow-hidden overflow-auto">
        <div className="w-full max-w-[1300px] h-full grid grid-cols-12 md:overflow-hidden pb-4 overflow-auto gap-3">
          <div className="col-span-12 md:col-span-4 h-full overflow-hidden min-h-0">
            <SessionSidebar selectedSessionId={selectedSessionId} onSelectSession={setSelectedSessionId} />
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-col h-full overflow-hidden min-h-0">
            {selectedSessionId ? (
              <ChatWindow sessionId={selectedSessionId} />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="max-w-md text-center space-y-4">
                  <h1 className="text-3xl font-bold">Welcome to Career Chat</h1>
                  <p className="text-muted-foreground">
                    Create a new session from the sidebar to get started with your AI career counselor.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
