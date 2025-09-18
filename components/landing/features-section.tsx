"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Clock, 
  Target, 
  BookOpen, 
  DollarSign, 
  Users2,
  Lightbulb,
  BarChart3
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Advanced AI technology provides personalized career guidance based on your unique situation and goals.",
    badge: "Smart"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Get career advice whenever you need it. Our AI counselor is available around the clock.",
    badge: "Always On"
  },
  {
    icon: Target,
    title: "Goal-Oriented Planning",
    description: "Set clear career objectives and receive step-by-step guidance to achieve them.",
    badge: "Strategic"
  },
  {
    icon: BookOpen,
    title: "Skill Development",
    description: "Identify skill gaps and get recommendations for courses, certifications, and learning resources.",
    badge: "Growth"
  },
  {
    icon: DollarSign,
    title: "Salary Negotiation",
    description: "Learn effective negotiation strategies and get market insights for better compensation.",
    badge: "Financial"
  },
  {
    icon: Users2,
    title: "Interview Preparation",
    description: "Practice common interview questions and get tips to improve your interview performance.",
    badge: "Practice"
  },
  {
    icon: Lightbulb,
    title: "Career Transitions",
    description: "Navigate career changes with confidence using our strategic transition planning.",
    badge: "Transform"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your career development journey with detailed analytics and insights.",
    badge: "Analytics"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Career Success
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and guidance you need to advance your career
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="relative overflow-hidden border-0 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
