// Environment variables configuration for OpenAI integration
// This file will be used when implementing actual OpenAI API integration

export const env = {
  OPENAI_API_KEY:
    process.env.OPENAI_API_KEY ||
    "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",
  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4o-mini",
  OPENAI_TEMPERATURE: Number.parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
  OPENAI_MAX_TOKENS: Number.parseInt(process.env.OPENAI_MAX_TOKENS || "2000"),

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
} as const

export function validateEnv() {
  const requiredVars = ["DATABASE_URL", "NEXTAUTH_SECRET"]

  for (const varName of requiredVars) {
    if (!env[varName as keyof typeof env]) {
      throw new Error(`Missing required environment variable: ${varName}`)
    }
  }

  // Optional: Warn about missing OpenAI configuration
  if (!env.OPENAI_API_KEY && env.NODE_ENV === "production") {
    console.warn("Warning: OPENAI_API_KEY not set. Using placeholder responses.")
  }
}
