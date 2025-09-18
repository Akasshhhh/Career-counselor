"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Users, TrendingUp, Shield, Sparkles, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div className="h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="mx-auto mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Career Guidance
          </div>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Transform Your Career with{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Expert AI Guidance
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Get personalized career counseling, job search strategies, and professional development advice 
            from our advanced AI counselor. Available 24/7 to help you achieve your career goals.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/signup">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-secondary" />
              Secure & Private
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              Trusted by Professionals
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-accent" />
              Proven Results
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Personalized Conversations</h3>
              <p className="text-muted-foreground">
                Engage in meaningful conversations tailored to your unique career situation and goals.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Strategic Planning</h3>
              <p className="text-muted-foreground">
                Develop actionable career strategies and roadmaps to achieve your professional objectives.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Expert Insights</h3>
              <p className="text-muted-foreground">
                Access professional insights on industry trends, skill development, and career transitions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
