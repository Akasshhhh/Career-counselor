import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"
import { prisma } from "@/lib/db"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

export const createTRPCContext = async (opts: { req: Request }) => {
  const { req } = opts

  console.log("[trpc] Creating context")

  // Convert to NextRequest so next-auth/jwt can parse cookies
  const nextReq = new NextRequest(req.url, { headers: req.headers })
  const token = await getToken({ req: nextReq, secret: process.env.NEXTAUTH_SECRET })

  const user = token
    ? {
        id: String(token.id ?? ""),
        email: String(token.email ?? ""),
        name: String(token.name ?? ""),
      }
    : null

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
  if (!ctx.user || !ctx.user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})
