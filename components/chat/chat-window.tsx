"use client"

import { useEffect, useRef } from "react"
import { trpc } from "@/lib/trpc/client"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

interface ChatWindowProps {
  sessionId: string
}

export function ChatWindow({ sessionId }: ChatWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const utils = trpc.useUtils()

  const { data: session, isLoading } = trpc.chat.getSession.useQuery({
    sessionId,
  })

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      utils.chat.getSession.invalidate({ sessionId })
      utils.chat.getSessions.invalidate()
    },
  })

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessageMutation.mutateAsync({
        sessionId,
        content,
        // role is handled by the backend
      })
    } catch (error) {
      console.error("Failed to send message:", error)
      // TODO: Show error to user
    }
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [session?.messages])

  if (isLoading) {
    return (
      <Card className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </Card>
    )
  }

  if (!session) {
    return (
      <Card className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Session not found</p>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden min-h-0">
      <div className="p-3 md:p-4 border-b flex-shrink-0">
        <h2 className="font-semibold text-lg">{session.title}</h2>
        <p className="text-sm text-muted-foreground">Career Counseling Session</p>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0">
        <div className="p-4">
          {session.messages.length === 0 ? (
            <div className="flex items-center justify-center min-h-[280px]">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Start Your Career Conversation</h3>
                <p className="text-muted-foreground mb-4">
                  Ask me anything about your career goals, job search strategies, professional development, or workplace
                  challenges.
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• "How do I transition to a new career field?"</p>
                  <p>• "What skills should I develop for my industry?"</p>
                  <p>• "How can I improve my interview performance?"</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {session?.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  status={message.status}
                  timestamp={message.createdAt}
                  className={message.status === 'ERROR' ? 'border-l-4 border-red-500' : ''}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0">
        <ChatInput onSendMessage={handleSendMessage} disabled={sendMessageMutation.isPending} />
      </div>
    </Card>
  )
}
