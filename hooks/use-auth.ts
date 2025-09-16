import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

  const redirectToLogin = () => {
    router.push("/login")
  }

  const redirectToDashboard = () => {
    router.push("/")
  }

  const requireAuth = (callback: () => void) => {
    if (!isAuthenticated) {
      redirectToLogin()
      return
    }
    callback()
  }

  return {
    session,
    isAuthenticated,
    isLoading,
    redirectToLogin,
    redirectToDashboard,
    requireAuth,
  }
}
