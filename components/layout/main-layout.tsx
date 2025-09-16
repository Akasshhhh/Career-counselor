"use client"

import { ReactNode } from "react"
import { Navbar } from "./navbar"

type MainLayoutProps = {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden flex-col">
      <Navbar />
      <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
    </div>
  )
}
