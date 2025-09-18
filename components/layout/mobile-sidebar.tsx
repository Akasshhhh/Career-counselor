"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { SessionSidebar } from "@/components/chat/session-sidebar"

interface MobileSidebarProps {
  selectedSessionId?: string
  onSelectSession: (sessionId: string) => void
}

export function MobileSidebar({ selectedSessionId, onSelectSession }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)

  const handleSelectSession = useCallback((sessionId: string) => {
    // Only update if it's a different session
    if (sessionId !== selectedSessionId) {
      onSelectSession(sessionId)
    }
    // Always close the sidebar after selection
    setOpen(false)
  }, [onSelectSession, selectedSessionId])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={(e) => {
            // Prevent the default behavior that might interfere with the sheet
            e.preventDefault()
            setOpen(true)
          }}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[300px] sm:w-[350px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="h-full">
          <SessionSidebar 
            selectedSessionId={selectedSessionId} 
            onSelectSession={handleSelectSession}
            autoSelectFirst={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
