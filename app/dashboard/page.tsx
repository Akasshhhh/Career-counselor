"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { SessionSidebar } from "@/components/chat/session-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { useSession } from "next-auth/react"
import { Loader2, ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <div className="container h-full flex bg-background overflow-hidden mx-auto py-4 gap-x-4">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 h-full flex-shrink-0">
          <SessionSidebar selectedSessionId={selectedSessionId} onSelectSession={setSelectedSessionId} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {selectedSessionId ? (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedSessionId(undefined)}
                className="shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to sessions</span>
              </Button>
            ) : (
              <MobileSidebar selectedSessionId={selectedSessionId} onSelectSession={setSelectedSessionId} />
            )}
            <h1 className="font-semibold text-lg truncate mx-4">
              {selectedSessionId ? "Career Chat" : "Dashboard"}
            </h1>
            <div className="w-10 shrink-0" /> {/* Spacer for centering */}
          </div>

          {/* Chat Content */}
          <div className="flex-1 min-h-0 px-1 mr-4">
            {selectedSessionId ? (
              <ChatWindow sessionId={selectedSessionId} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <div className="max-w-md text-center space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold">Welcome to Career Chat</h1>
                    <p className="text-muted-foreground">
                      Start a conversation with your AI career counselor to get personalized guidance on your professional journey.
                    </p>
                  </div>
                  
                  {/* Mobile CTA */}
                  <div className="md:hidden">
                    <MobileSidebar selectedSessionId={selectedSessionId} onSelectSession={setSelectedSessionId} />
                  </div>
                  
                  <div className="hidden md:block text-sm text-muted-foreground">
                    Create a new session from the sidebar to get started.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
