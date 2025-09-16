import { MessageRole } from "@/lib/types"

export interface ChatSession {
  id: string
  title: string
  summary?: string
  lastMessage?: Date | null
  updatedAt: Date
  userId: string
  messages: Message[]
  _count?: {
    messages: number
  }
}

export interface Message {
  id: string
  content: string
  role: MessageRole
  status: 'SENT' | 'ERROR'
  createdAt: Date
  chatSessionId: string
}

export interface ChatContext {
  summary?: string
  recentMessages: Array<{
    role: MessageRole
    content: string
  }>
  totalMessages: number
}
