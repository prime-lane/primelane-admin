import { Navigate } from 'react-router-dom'
import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { path } from '@/app/paths'
import type { ReactNode } from 'react'

interface PublicRouteProps {
  children: ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { data: user, isLoading } = useCurrentUser()
  const hasToken = !!localStorage.getItem('access_token')

  if (isLoading) {
    return null
  }

  if (user && hasToken) {
    return <Navigate to={path.DASHBOARD.ROOT} replace />
  }

  return <>{children}</>
}
