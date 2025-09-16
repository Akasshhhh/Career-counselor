"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SessionSidebar } from "@/components/chat/session-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { UserDashboard } from "@/components/chat/user-dashboard"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedSessionId, setSelectedSessionId] = useState<string>()
  const { data: sessions, isLoading: isLoadingSessions } = trpc.chat.getSessions.useQuery(undefined, {
    enabled: status === 'authenticated'
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Auto-select first session when sessions load
  useEffect(() => {
    if (sessions && sessions.length > 0 && !selectedSessionId) {
      setSelectedSessionId(sessions[0].id)
    }
  }, [sessions, selectedSessionId])

  if (status === 'loading' || status === 'unauthenticated' || isLoadingSessions) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-background">
      <SessionSidebar 
        selectedSessionId={selectedSessionId} 
        onSelectSession={setSelectedSessionId} 
      />
      <div className="flex-1 flex flex-col p-4">
        {selectedSessionId ? (
          <>
            <div className="mb-4">
              <UserDashboard />
            </div>
            <ChatWindow sessionId={selectedSessionId} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="max-w-md text-center space-y-4">
              <h1 className="text-3xl font-bold">Welcome to Career Chat</h1>
              <p className="text-muted-foreground">
                Your AI-powered career counseling assistant is ready to help you with your career journey.
              </p>
              <div className="pt-4">
                <Button onClick={() => {
                  // Logic to create a new session
                  // This will be implemented in the UserDashboard component
                  const createSessionButton = document.getElementById('create-session-button')
                  if (createSessionButton) {
                    createSessionButton.click()
                  }
                }}>
                  Start a New Session
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
