import { MessageRole } from "@/lib/types"

// Extended message role that includes system messages
export type AIMessageRole = MessageRole

// Base message interface that works with both database and AI messages
export interface AIMessage {
  role: AIMessageRole
  content: string
  name?: string
  // Make createdAt optional since it might come from the database
  createdAt?: Date
}

export interface AIResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    message: AIMessage
    index: number
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface AIError extends Error {
  status?: number
  code?: string
  details?: unknown
}

export interface AIGenerateParams {
  messages: AIMessage[]
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  stop?: string | string[]
}

export interface AIModel {
  generate(params: AIGenerateParams): Promise<AIResponse>
}

export interface CareerCounselorConfig {
  model?: string
  temperature?: number
  maxTokens?: number
  messageWindowSize?: number
  summaryInterval?: number
}

export interface GenerateResponseResult {
  response: string
  shouldUpdateSummary: boolean
}

export interface ChatContext {
  summary?: string
  recentMessages: AIMessage[]
  totalMessages: number
}
