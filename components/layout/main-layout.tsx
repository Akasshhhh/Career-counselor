"use client"

import { ReactNode } from "react"
import { useSession } from "next-auth/react"
import { Navbar } from "./navbar"
import { ThemeToggle } from "@/components/ui/theme-toggle"

type MainLayoutProps = {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { status } = useSession()
  const isAuthed = status === "authenticated"
  return (
    <div className={`flex ${isAuthed ? "h-screen" : "min-h-screen"} flex-col`}>
      {isAuthed && <Navbar />}
      <main className={`flex-1 ${isAuthed ? "min-h-0 overflow-auto" : "overflow-auto"}`}>
        <div className="h-full">
          {children}
        </div>
      </main>
      {!isAuthed && (
        <div className="fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
      )}
    </div>
  )
}
