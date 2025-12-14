import { Navigate } from 'react-router-dom'
import { useIsAuthenticated } from '@/features/auth/hooks/use-current-user'
import { path } from '@/app/paths'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to={path.AUTH.SIGN_IN} replace />
  }

  return <>{children}</>
}

