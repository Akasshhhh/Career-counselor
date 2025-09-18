"use client"

import { useEffect, useRef, useState } from "react"
import { trpc } from "@/lib/trpc/client"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { ChatTypingBubble } from "./chat-typing-bubble"

interface ChatWindowProps {
  sessionId: string
}

export function ChatWindow({ sessionId }: ChatWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const utils = trpc.useUtils()
  const [optimisticMessages, setOptimisticMessages] = useState<Array<{
    id: string
    role: 'USER' | 'ASSISTANT'
    content: string
    status: 'SENT' | 'ERROR'
    createdAt: Date
  }>>([])
  const [isTyping, setIsTyping] = useState(false)

  const { data: session, isLoading } = trpc.chat.getSession.useQuery({
    sessionId,
  })

  const sendMessageMutation = trpc.chat.sendMessage.useMutation()

  const handleSendMessage = async (content: string) => {
    // 1) Optimistically add the user's message immediately
    const tempUserId = `temp-user-${Date.now()}`
    const userMsg = {
      id: tempUserId,
      role: 'USER' as const,
      content,
      status: 'SENT' as const,
      createdAt: new Date(),
    }
    setOptimisticMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    try {
      // 2) Send to server and get AI response
      const result = await sendMessageMutation.mutateAsync({ sessionId, content })

      // 3) Simulate streaming assistant response locally
      const full = result.aiMessage.content || ''
      const tempAssistantId = `temp-assistant-${Date.now()}`

      // Replace typing bubble with streaming text
      setIsTyping(false)

      // Add empty assistant message to start streaming into it
      setOptimisticMessages((prev) => [
        ...prev,
        {
          id: tempAssistantId,
          role: 'ASSISTANT',
          content: '',
          status: 'SENT',
          createdAt: new Date(),
        },
      ])

      // Progressive reveal: character-by-character (batched for performance)
      let index = 0
      const step = Math.max(2, Math.floor(full.length / 120)) // ~120 steps max
      const interval = setInterval(() => {
        index = Math.min(full.length, index + step)
        const slice = full.slice(0, index)
        setOptimisticMessages((prev) =>
          prev.map((m) => (m.id === tempAssistantId ? { ...m, content: slice } : m)),
        )
        if (index >= full.length) {
          clearInterval(interval)
          // After finish, sync with server and clear optimistic messages
          Promise.all([
            utils.chat.getSession.invalidate({ sessionId }),
            utils.chat.getSessions.invalidate(),
          ]).finally(() => setOptimisticMessages([]))
        }
      }, 20)
    } catch (error) {
      console.error("Failed to send message:", error)
      // Mark last optimistic user message as error
      setOptimisticMessages((prev) =>
        prev.map((m) => (m.id === tempUserId ? { ...m, status: 'ERROR' as const } : m)),
      )
      setIsTyping(false)
    }
  }

  // Auto-scroll to bottom when new or optimistic messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [session?.messages, optimisticMessages, isTyping])

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
    <Card className="h-full flex flex-col overflow-hidden min-h-0 border-0 md:border bg-transparent md:bg-card shadow-none md:shadow-sm rounded-lg">
      <div className="p-3 md:p-4 border-b flex-shrink-0">
        <h2 className="font-semibold text-lg truncate">{session.title}</h2>
        <p className="text-sm text-muted-foreground">Career Counseling Session</p>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0">
        <div className="p-4">
          {session.messages.length === 0 && optimisticMessages.length === 0 ? (
            <div className="flex items-center justify-center min-h-[280px]">
              <div className="text-center max-w-[550px]">
                <h3 className="text-lg font-medium mb-2">Start Your Career Conversation</h3>
                <p className="text-muted-foreground mb-4">
                  Ask me anything about your career goals, job search strategies, professional development, or workplace
                  challenges.
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>"How do I transition to a new career field?"</p>
                  <p>"What skills should I develop for my industry?"</p>
                  <p>"How can I improve my interview performance?"</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {[...(session?.messages ?? []), ...optimisticMessages].map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  status={message.status}
                  timestamp={message.createdAt}
                  className={message.status === 'ERROR' ? 'border-l-4 border-destructive' : ''}
                />
              ))}
              {isTyping && <ChatTypingBubble />}
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
