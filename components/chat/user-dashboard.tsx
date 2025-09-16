"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, TrendingUp, Activity, Plus, Loader2 } from "lucide-react"

export function UserDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const utils = trpc.useContext()
  const { data: stats, isLoading } = trpc.chat.getUserStats.useQuery()
  
  const createSession = trpc.chat.createSession.useMutation({
    onSuccess: (newSession) => {
      // Invalidate the sessions query to refetch the list
      utils.chat.getSessions.invalidate()
      // Navigate to the new session
      router.push(`/?sessionId=${newSession.id}`)
    },
  })

  const handleCreateSession = () => {
    createSession.mutate({
      title: `Career Session ${new Date().toLocaleDateString()}`,
    })
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {session?.user?.name || 'User'}</h2>
          <p className="text-muted-foreground">How can we help with your career today?</p>
        </div>
        <Button 
          id="create-session-button"
          onClick={handleCreateSession}
          disabled={createSession.status === 'pending'}
          className="gap-2"
        >
          {createSession.status === 'pending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              New Session
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSessions}</div>
          <p className="text-xs text-muted-foreground">Career counseling sessions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalMessages}</div>
          <p className="text-xs text-muted-foreground">Questions and responses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentSessions}</div>
          <p className="text-xs text-muted-foreground">New sessions created</p>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
