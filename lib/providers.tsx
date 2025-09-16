"use client"

import type React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { AuthProvider } from "./auth/context"
import { useState } from "react"
import { trpc } from "./trpc/client"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: {
            serialize: (data) => JSON.stringify(data),
            deserialize: (data) => JSON.parse(data),
          },
          headers() {
            if (typeof window === "undefined") return {}

            try {
              const user = JSON.parse(localStorage.getItem("mock-user") || "null")
              console.log("[v0] tRPC client headers - user from localStorage:", user)

              const headers = user
                ? {
                    "x-user-id": user.id,
                    "x-user-email": user.email,
                    "x-user-name": user.name,
                  }
                : {
                    "x-user-id": "user-1",
                    "x-user-email": "john@example.com",
                    "x-user-name": "John Doe",
                  }

              console.log("[v0] tRPC client sending headers:", headers)
              return headers
            } catch (error) {
              console.error("[v0] Error reading user from localStorage:", error)
              return {
                "x-user-id": "user-1",
                "x-user-email": "john@example.com",
                "x-user-name": "John Doe",
              }
            }
          },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
