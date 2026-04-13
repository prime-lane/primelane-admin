import { useEffect, useRef, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { usePermissionsContext } from '@/hooks/permissions-context'
import { NAV_ITEMS } from '@/config/dashboard'
import { path } from '@/app/paths'

interface RoutePermissionGateProps {
  children: ReactNode
  permission: string
}

const getFirstAccessibleRoute = (
  hasPermission: (permission: string) => boolean,
): string => {
  for (const item of NAV_ITEMS) {
    if (item.permission && hasPermission(item.permission)) {
      return item.to
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.permission && hasPermission(child.permission)) {
          return child.to
        }
      }
    }
  }
  return path.DASHBOARD.ROOT
}

export const RoutePermissionGate = ({
  children,
  permission,
}: RoutePermissionGateProps) => {
  const { hasPermission, isLoading } = usePermissionsContext()
  const location = useLocation()

  const hasShownToast = useRef(false)

  useEffect(() => {
    if (!isLoading && !hasPermission(permission)) {
      toast.error('Access Restricted', {
        description: `You do not have sufficient permission to access this page (${location.pathname}).`,
      })
      hasShownToast.current = true
    }
  }, [isLoading, hasPermission, permission])

  if (isLoading) {
    return null
  }

  if (!hasPermission(permission)) {
    const firstRoute = getFirstAccessibleRoute(hasPermission)
    return <Navigate to={firstRoute} state={{ from: location }} replace />
  }

  return <>{children}</>
}
