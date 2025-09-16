import { Suspense } from "react"
import { Metadata } from "next"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your career counseling dashboard",
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a protected route. Only authenticated users can see this content.</p>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
