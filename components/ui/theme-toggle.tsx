"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  className?: string
  size?: "sm" | "default" | "lg"
}

export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === "dark" || theme === "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("rounded-full", className)}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", isDark && "-rotate-90 scale-0")} />
      <Moon className={cn("absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all", isDark && "rotate-0 scale-100")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
