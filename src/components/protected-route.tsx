import { Navigate } from 'react-router-dom'
import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { path } from '@/app/paths'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: user, isLoading } = useCurrentUser()
  const hasToken = !!localStorage.getItem('access_token')

  if (isLoading) {
    return null
  }

  if (!user || !hasToken) {
    return <Navigate to={path.AUTH.SIGN_IN} replace />
  }

  return <>{children}</>
}
