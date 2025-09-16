import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../server"
import { MessageRole } from "@/lib/types"
import { careerCounselorAI } from "@/lib/ai/career-counselor"

export const chatRouter = createTRPCRouter({
  // Get all chat sessions for the user
  getSessions: protectedProcedure.query(async ({ ctx }) => {
    const sessions = await ctx.prisma.chatSession.findMany({
      where: { userId: ctx.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { messages: true },
        },
      },
    })

    return sessions.map((session: { lastMessage: Date | null; updatedAt: Date }) => ({
      ...session,
      lastActivity: session.lastMessage || session.updatedAt,
    }))
  }),

  // Get a specific chat session with messages
  getSession: protectedProcedure.input(z.object({ sessionId: z.string() })).query(async ({ ctx, input }) => {
    return ctx.prisma.chatSession.findFirst({
      where: {
        id: input.sessionId,
        userId: ctx.user.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    })
  }),

  // Create a new chat session
  createSession: protectedProcedure.input(z.object({ title: z.string() })).mutation(async ({ ctx, input }) => {
    try {
      const session = await ctx.prisma.chatSession.create({
        data: {
          title: input.title,
          userId: ctx.user.id,
          summary: "" // Initialize empty summary
        },
      })

      console.log("[v0] Successfully created session:", session.id)
      return session
    } catch (error) {
      console.error("[v0] Error creating chat session:", error)
      throw new Error(`Failed to create chat session: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }),

  // Update session title
  updateSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        title: z.string().optional(),
        summary: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.chatSession.update({
        where: {
          id: input.sessionId,
          userId: ctx.user.id,
        },
        data: {
          ...(input.title && { title: input.title }),
          ...(input.summary && { summary: input.summary }),
          updatedAt: new Date(),
        },
      })
    }),

  // Get session analytics/stats
  getSessionStats: protectedProcedure.input(z.object({ sessionId: z.string() })).query(async ({ ctx, input }) => {
    const session = await ctx.prisma.chatSession.findFirst({
      where: {
        id: input.sessionId,
        userId: ctx.user.id,
      },
      include: {
        messages: {
          select: {
            role: true,
            createdAt: true,
          },
        },
      },
    })

    if (!session) return null

    const userMessages = session.messages.filter((m: { role: MessageRole }) => m.role === MessageRole.USER)
    const assistantMessages = session.messages.filter((m: { role: MessageRole }) => m.role === MessageRole.ASSISTANT)

    const firstMessage = session.messages[0]
    const lastMessage = session.messages[session.messages.length - 1]

    const duration =
      firstMessage && lastMessage ? lastMessage.createdAt.getTime() - firstMessage.createdAt.getTime() : 0

    return {
      totalMessages: session.messages.length,
      userMessages: userMessages.length,
      assistantMessages: assistantMessages.length,
      duration: Math.round(duration / 1000 / 60), // in minutes
      createdAt: session.createdAt,
      lastActivity: session.lastMessage || session.updatedAt,
    }
  }),

  // Send a message
  sendMessage: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify session belongs to user
      const session = await ctx.prisma.chatSession.findFirst({
        where: {
          id: input.sessionId,
          userId: ctx.user.id,
        },
      })

      if (!session) {
        throw new Error("Session not found")
      }

      // Create the user message with status
      const userMessage = await ctx.prisma.message.create({
        data: {
          content: input.content,
          role: MessageRole.USER,
          status: 'SENT',
          chatSessionId: input.sessionId,
        },
      })

      // Generate AI response with context management
      const { response: aiResponse, shouldUpdateSummary } = await careerCounselorAI.generateResponse(
        input.content,
        input.sessionId,
        ctx.user.id
      )

      // Create the AI's response message
      const aiMessage = await ctx.prisma.message.create({
        data: {
          content: aiResponse,
          role: MessageRole.ASSISTANT,
          status: 'SENT',
          chatSessionId: input.sessionId,
        },
      })

      // Update the session's lastMessage timestamp
      await ctx.prisma.chatSession.update({
        where: { id: input.sessionId },
        data: { 
          lastMessage: new Date(),
          // Update title if this is the first message
          ...(session.title === 'New Chat' && { 
            title: input.content.slice(0, 50) + (input.content.length > 50 ? '...' : '')
          })
        },
      })

      // Update summary if needed
      if (shouldUpdateSummary) {
        await careerCounselorAI.generateSummary(input.sessionId, ctx.user.id)
      }

      return {
        userMessage,
        aiMessage,
      }
    }),

  // Delete a chat session
  deleteSession: protectedProcedure.input(z.object({ sessionId: z.string() })).mutation(async ({ ctx, input }) => {
    return ctx.prisma.chatSession.delete({
      where: {
        id: input.sessionId,
        userId: ctx.user.id,
      },
    })
  }),

  // Archive multiple sessions
  archiveSessions: protectedProcedure
    .input(z.object({ sessionIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      // For now, we'll just delete them since we don't have an archived field
      // In a real app, you'd add an 'archived' boolean field to the schema
      return ctx.prisma.chatSession.deleteMany({
        where: {
          id: { in: input.sessionIds },
          userId: ctx.user.id,
        },
      })
    }),

  // Get user's overall chat statistics
  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    const totalSessions = await ctx.prisma.chatSession.count({
      where: { userId: ctx.user.id },
    })

    const totalMessages = await ctx.prisma.message.count({
      where: {
        chatSession: {
          userId: ctx.user.id,
        },
      },
    })

    const recentSessions = await ctx.prisma.chatSession.count({
      where: {
        userId: ctx.user.id,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
    })

    return {
      totalSessions,
      totalMessages,
      recentSessions,
    }
  }),
})
