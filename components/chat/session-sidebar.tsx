"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Plus, MessageSquare, Trash2  } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

interface SessionSidebarProps {
  selectedSessionId?: string
  onSelectSession: (sessionId: string) => void
}

export function SessionSidebar({ selectedSessionId, onSelectSession }: SessionSidebarProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [newSessionTitle, setNewSessionTitle] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const utils = trpc.useUtils()

  const { data: sessions, isLoading } = trpc.chat.getSessions.useQuery(undefined, {
    enabled: !!session?.user
  })

  // Auto-select the first session if none is selected
  useEffect(() => {
    if (!selectedSessionId && sessions && sessions.length > 0) {
      onSelectSession(sessions[0].id)
    }
  }, [selectedSessionId, sessions, onSelectSession])

  const createSessionMutation = trpc.chat.createSession.useMutation({
    onSuccess: (session) => {
      console.log("[v0] Session created successfully:", session)
      utils.chat.getSessions.invalidate()
      onSelectSession(session.id)
      setNewSessionTitle("")
      setIsCreating(false)
      setError(null)
    },
    onError: (error) => {
      console.error("[v0] Failed to create session:", error)
      setError(error.message || "Failed to create session")
    },
  })

  const deleteSessionMutation = trpc.chat.deleteSession.useMutation({
    onSuccess: () => {
      utils.chat.getSessions.invalidate()
      if (selectedSessionId && sessions) {
        const remainingSessions = sessions.filter((s: { id: string }) => s.id !== selectedSessionId)
        if (remainingSessions.length > 0) {
          onSelectSession(remainingSessions[0].id)
        }
      }
    },
  })

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newSessionTitle.trim()) {
      console.log("[v0] Creating session with title:", newSessionTitle.trim())
      setError(null)
      try {
        await createSessionMutation.mutateAsync({
          title: newSessionTitle.trim(),
        })
      } catch (err) {
        console.error("[v0] Error in handleCreateSession:", err)
        // Error is already handled by onError callback
      }
    }
  }

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this session?")) {
      await deleteSessionMutation.mutateAsync({ sessionId })
    }
  }


  return (
    <Card className="w-full h-full flex flex-col overflow-hidden min-h-0 border-0 md:border bg-transparent md:bg-card shadow-none md:shadow-sm rounded-lg">
      <div className="p-3 md:p-4 border-b flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
            <span className="text-sm font-medium">{session?.user?.name || "User"}</span>
          </div>
        </div>   
        {isCreating ? (
          <form onSubmit={handleCreateSession} className="space-y-2">
            <Input
              value={newSessionTitle}
              onChange={(e) => setNewSessionTitle(e.target.value)}
              placeholder="Session title..."
              autoFocus
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={!newSessionTitle.trim() || createSessionMutation.isPending}>
                {createSessionMutation.isPending ? "Creating..." : "Create"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsCreating(false)
                  setNewSessionTitle("")
                  setError(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button id="create-session-button" onClick={() => setIsCreating(true)} className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create New Chat
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3 md:p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : sessions?.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No sessions yet. Create your first one!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {sessions?.map((session: { id: string; title: string; _count: { messages: number } }) => (
                <div
                  key={session.id}
                  className={cn(
                    "group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors",
                    selectedSessionId === session.id && "bg-muted",
                  )}
                  onClick={() => onSelectSession(session.id)}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{session.title}</h3>
                    <p className="text-xs text-muted-foreground">{session._count.messages} messages</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleDeleteSession(session.id, e)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
