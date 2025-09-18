"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { SessionSidebar } from "@/components/chat/session-sidebar"

interface MobileSidebarProps {
  selectedSessionId?: string
  onSelectSession: (sessionId: string) => void
}

export function MobileSidebar({ selectedSessionId, onSelectSession }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)

  const handleSelectSession = (sessionId: string) => {
    onSelectSession(sessionId)
    setOpen(false) // Close sidebar after selection on mobile
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-80">
        <SessionSidebar 
          selectedSessionId={selectedSessionId} 
          onSelectSession={handleSelectSession} 
        />
      </SheetContent>
    </Sheet>
  )
}
