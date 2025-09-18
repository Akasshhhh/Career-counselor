import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Providers } from "@/lib/providers"
import { MainLayout } from "@/components/layout/main-layout"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Career Counseling Chat",
  description: "Professional career counseling powered by AI",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`h-screen mx-auto font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={null}>
            <Providers>
              <MainLayout>{children}</MainLayout>
            </Providers>
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
