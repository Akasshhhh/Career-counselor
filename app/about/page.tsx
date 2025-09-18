import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | CareerChat",
  description: "Learn more about CareerChat and how it can help with your career journey."
}

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="container py-8 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">About CareerChat</h1>
          <p className="text-muted-foreground">Your AI-powered career companion</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              Empowering professionals at every stage of their career journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              CareerChat is an AI-powered platform designed to provide personalized career guidance, 
              interview preparation, and professional development advice. Whether you're just starting 
              out, considering a career change, or looking to advance in your current role, our AI 
              assistant is here to help 24/7.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">Personalized Career Advice</h3>
                <p className="text-sm text-muted-foreground">
                  Get tailored recommendations based on your skills, experience, and goals.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Interview Preparation</h3>
                <p className="text-sm text-muted-foreground">
                  Practice with common interview questions and receive feedback.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Resume Review</h3>
                <p className="text-sm text-muted-foreground">
                  Get suggestions to improve your resume and make it stand out.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Sign Up</h3>
                  <p className="text-sm text-muted-foreground">Create your free account to get started.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Start Chatting</h3>
                  <p className="text-sm text-muted-foreground">Ask any career-related questions you have.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Grow Your Career</h3>
                  <p className="text-sm text-muted-foreground">Implement the advice and track your progress.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Have questions? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Email: support@careerchat.example.com
              </p>
              <p className="text-sm text-muted-foreground">
                Phone: (123) 456-7890
              </p>
              <p className="text-sm text-muted-foreground">
                Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
              </p>
            </div>
          </CardContent>
        </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
