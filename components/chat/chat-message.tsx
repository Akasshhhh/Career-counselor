import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  content: string
  role: 'USER' | 'ASSISTANT'
  timestamp?: Date
  status?: 'SENT' | 'ERROR'
  className?: string
}

export function ChatMessage({ content, role, timestamp, status, className }: ChatMessageProps) {
  const isUser = role === 'USER'
  const isError = status === 'ERROR'

  return (
    <div className={cn(
      "flex gap-3 p-4", 
      isUser ? "flex-row-reverse" : "flex-row",
      isError && "bg-red-50 dark:bg-red-950/30",
      className
    )}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn(isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex flex-col gap-1 max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "relative rounded-lg px-3 py-2 text-sm shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground border border-border",
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>          
        </div>
        <span className="text-xs text-muted-foreground/80">
          {timestamp?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }) || ''}
          {isError && (
            <span className="text-destructive ml-2">
              Failed to send
            </span>
          )}
        </span>
      </div>
    </div>
  )
}
