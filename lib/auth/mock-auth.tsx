"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string | null
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for development
const MOCK_USERS = [
  {
    id: "user-1",
    email: "john@example.com",
    name: "John Doe",
    password: "password123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "jane@example.com",
    name: "Jane Smith",
    password: "password123",
    createdAt: new Date().toISOString(),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("mock-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      setIsLoading(false)
      throw new Error("Invalid email or password")
    }

    // Only include fields that match our User type
    const userData: User = {
      id: user.id,
      email: user.email,
      name: user.name || null,
      createdAt: user.createdAt,
    }
    
    setUser(userData)
    localStorage.setItem("mock-user", JSON.stringify(userData))
    setIsLoading(false)
  }

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

    const userExists = MOCK_USERS.some((u) => u.email === email)
    if (userExists) {
      setIsLoading(false)
      throw new Error("User already exists")
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      password,
      createdAt: new Date().toISOString(),
    }

    MOCK_USERS.push(newUser)
    
    // Only include fields that match our User type
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name || null,
      createdAt: newUser.createdAt,
    }
    
    setUser(userData)
    localStorage.setItem("mock-user", JSON.stringify(userData))
    setIsLoading(false)
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("mock-user")
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signOut, signUp }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
