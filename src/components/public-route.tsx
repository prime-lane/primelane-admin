import { Navigate } from 'react-router-dom'
import { useIsAuthenticated } from '@/features/auth/hooks/use-current-user'
import { path } from '@/app/paths'
import type { ReactNode } from 'react'

interface PublicRouteProps {
  children: ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Navigate to={path.DASHBOARD.ROOT} replace />
  }

  return <>{children}</>
}
