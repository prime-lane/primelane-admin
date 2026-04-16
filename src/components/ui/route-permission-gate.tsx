import { useEffect, useRef, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { usePermissionsContext } from '@/hooks/permissions-context'
import { NAV_ITEMS } from '@/config/dashboard'

interface RoutePermissionGateProps {
  children: ReactNode
  permission: string
}

const getFirstAccessibleRoute = (
  hasPermission: (permission: string) => boolean,
): string | null => {
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
  return null
}

export const RoutePermissionGate = ({
  children,
  permission,
}: RoutePermissionGateProps) => {
  const { hasPermission, isLoading } = usePermissionsContext()
  const location = useLocation()

  const hasShownToast = useRef(false)

  useEffect(() => {
    if (!isLoading && !hasPermission(permission) && !hasShownToast.current) {
      toast.error('Access Restricted', {
        description: `You do not have sufficient permission to access this page (${location.pathname}).`,
      })
      hasShownToast.current = true
    }
  }, [isLoading, hasPermission, permission, location.pathname])

  if (isLoading) {
    return null
  }

  if (!hasPermission(permission)) {
    const firstRoute = getFirstAccessibleRoute(hasPermission)

    if (firstRoute && firstRoute !== location.pathname) {
      return <Navigate to={firstRoute} state={{ from: location }} replace />
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8 text-center bg-white rounded-lg border border-dashed">
        <div className="text-4xl">🚫</div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-900">Access Denied</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            You don't have the required permission <pre>({permission})</pre> to view this
            page. Please contact your administrator.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

