"use client"

import { Bot } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ChatTypingBubble() {
  return (
    <div className="flex gap-3 p-4">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-muted">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 max-w-[80%] items-start">
        <div className="rounded-lg px-3 py-2 text-sm bg-card text-card-foreground border border-border">
          <span className="inline-flex items-center gap-1">
            <span className="size-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-300ms]"></span>
            <span className="size-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-150ms]"></span>
            <span className="size-2 rounded-full bg-muted-foreground/70 animate-bounce"></span>
          </span>
        </div>
      </div>
    </div>
  )
}
