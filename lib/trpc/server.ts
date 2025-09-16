import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"
import { prisma } from "@/lib/prisma"

export const createTRPCContext = async (opts: { req: Request }) => {
  const { req } = opts

  console.log("[v0] Creating tRPC context")

  const userId = req.headers.get("x-user-id")
  const userEmail = req.headers.get("x-user-email")
  const userName = req.headers.get("x-user-name")

  console.log("[v0] Headers received:", { userId, userEmail, userName })

  // If no user headers, try to get from mock auth or create a default user
  let user = null
  if (userId) {
    user = {
      id: userId,
      email: userEmail || "user@example.com",
      name: userName || "Mock User",
    }
  } else {
    console.log("[v0] No user headers found, creating default user")
    user = {
      id: "user-1",
      email: "john@example.com",
      name: "John Doe",
    }
  }

  console.log("[v0] Final user object:", user)

  return {
    prisma,
    user,
    req,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  console.log("[v0] Protected procedure - checking user:", ctx.user)

  if (!ctx.user) {
    console.log("[v0] No user found, throwing UNAUTHORIZED")
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  console.log("[v0] User authenticated, proceeding with:", ctx.user.id)
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})
