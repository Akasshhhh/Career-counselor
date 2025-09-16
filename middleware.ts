import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

// List of public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/signup",
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/error",
  "/api/auth/verify-request",
  "/api/auth/signout",
  "/_next",
  "/favicon.ico",
  "/public",
]

// List of auth routes
const authRoutes = ["/login", "/signup"]

// List of API routes that don't require authentication
const publicApiRoutes = [
  "/api/auth",
  "/api/trpc/auth",
  "/api/trpc/health",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for public routes
  if (
    publicRoutes.some(route => pathname.startsWith(route)) ||
    publicApiRoutes.some(route => pathname.startsWith(route))
  ) {
    return NextResponse.next()
  }

  // Get the token from the request (must use the same secret as NextAuth)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isAuthenticated = !!token

  // Handle authentication for API routes
  if (pathname.startsWith("/api")) {
    if (!isAuthenticated) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
