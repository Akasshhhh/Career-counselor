"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-3 md:p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 md:gap-3 max-w-4xl mx-auto"
      >
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your career goals, job search strategies, or professional development..."
            className="w-full min-h-[48px] md:min-h-[56px] max-h-32 md:max-h-40 resize-none rounded-xl text-sm md:text-base flex pt-3 placeholder:text-muted-foreground"
            disabled={disabled}
          />
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="h-[48px] w-[48px] md:h-[56px] md:w-[56px] rounded-xl shrink-0"
          aria-label="Send message"
        >
          <Send className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </form>
    </div>
  );
}
