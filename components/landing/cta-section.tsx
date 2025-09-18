"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
            <div className="h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
            <div className="h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <CardContent className="relative p-12 text-center">
            <div className="mx-auto mb-6 inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Ready to Transform Your Career?
            </div>
            
            <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Start Your Personalized Career Journey Today
            </h2>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Join thousands of professionals who have accelerated their careers with our AI-powered guidance. 
              Get started in minutes and see immediate results.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/login">Sign In to Continue</Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • Start chatting immediately • Secure & private
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
