import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createMockPrisma = () => {
  const mockData = {
    users: new Map(),
    chatSessions: new Map(),
    messages: new Map(),
  }

  return {
    user: {
      findUnique: async ({ where }: any) => {
        console.log("[v0] Mock: Finding user with:", where)
        return mockData.users.get(where.id) || null
      },
      create: async ({ data }: any) => {
        console.log("[v0] Mock: Creating user with:", data)
        const user = { id: data.id || "mock-user-1", ...data, createdAt: new Date(), updatedAt: new Date() }
        mockData.users.set(user.id, user)
        return user
      },
    },
    chatSession: {
      findMany: async ({ where }: any) => {
        console.log("[v0] Mock: Finding chat sessions for user:", where?.userId)
        return Array.from(mockData.chatSessions.values()).filter((session: any) => session.userId === where?.userId)
      },
      findFirst: async ({ where }: any) => {
        console.log("[v0] Mock: Finding chat session with:", where)
        return (
          Array.from(mockData.chatSessions.values()).find(
            (session: any) => session.id === where?.id && session.userId === where?.userId,
          ) || null
        )
      },
      create: async ({ data }: any) => {
        console.log("[v0] Mock: Creating chat session with:", data)
        const session = {
          id: `session-${Date.now()}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
          _count: { messages: 0 },
        }
        mockData.chatSessions.set(session.id, session)
        return session
      },
      update: async ({ where, data }: any) => {
        console.log("[v0] Mock: Updating chat session:", where, data)
        const session = mockData.chatSessions.get(where.id)
        if (session) {
          Object.assign(session, data, { updatedAt: new Date() })
          return session
        }
        throw new Error("Session not found")
      },
      delete: async ({ where }: any) => {
        console.log("[v0] Mock: Deleting chat session:", where)
        const session = mockData.chatSessions.get(where.id)
        if (session) {
          mockData.chatSessions.delete(where.id)
          return session
        }
        throw new Error("Session not found")
      },
      deleteMany: async ({ where }: any) => {
        console.log("[v0] Mock: Deleting multiple sessions:", where)
        let count = 0
        if (where?.id?.in) {
          where.id.in.forEach((id: string) => {
            if (mockData.chatSessions.delete(id)) count++
          })
        }
        return { count }
      },
      count: async ({ where }: any) => {
        console.log("[v0] Mock: Counting sessions for:", where)
        return Array.from(mockData.chatSessions.values()).filter((session: any) => session.userId === where?.userId)
          .length
      },
    },
    message: {
      create: async ({ data }: any) => {
        console.log("[v0] Mock: Creating message with:", data)
        const message = {
          id: `message-${Date.now()}`,
          ...data,
          createdAt: new Date(),
        }
        mockData.messages.set(message.id, message)
        return message
      },
      count: async ({ where }: any) => {
        console.log("[v0] Mock: Counting messages for:", where)
        return Array.from(mockData.messages.values()).filter((message: any) => {
          const session = mockData.chatSessions.get(message.chatSessionId)
          return session?.userId === where?.chatSession?.userId
        }).length
      },
    },
  }
}

export const prisma = process.env.DATABASE_URL
  ? (globalForPrisma.prisma ?? new PrismaClient())
  : (createMockPrisma() as any)

if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma
}
