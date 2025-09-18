"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { SessionSidebar } from "@/components/chat/session-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { useSession } from "next-auth/react"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardSessionPage({
  params: { sessionId },
}: {
  params: { sessionId: string }
}) {
  const { status } = useSession()
  const router = useRouter()

  // Handle session selection
  const handleSelectSession = (id: string) => {
    if (id !== sessionId) {
      router.push(`/dashboard/${id}`)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container h-full flex bg-background overflow-hidden mx-auto py-4 gap-x-4">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 h-full flex-shrink-0">
          <SessionSidebar
            selectedSessionId={sessionId}
            autoSelectFirst={false}
            onSelectSession={handleSelectSession}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 py-2">
            <MobileSidebar
              selectedSessionId={sessionId}
              onSelectSession={handleSelectSession}
            />
            <h1 className="font-semibold text-lg truncate mx-2">Chat</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>

          {/* Chat Content */}
          <div className="flex-1 min-h-0 px-1 mr-4">
            <ChatWindow sessionId={sessionId} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
