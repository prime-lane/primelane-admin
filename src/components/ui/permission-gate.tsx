import type { ReactNode } from 'react'
import { usePermissionsContext } from '@/hooks/permissions-context'

interface PermissionGateProps {
  children: ReactNode
  permission?: string
  anyOf?: string[]
  allOf?: string[]
  fallback?: ReactNode
}

export const PermissionGate = ({
  children,
  permission,
  anyOf,
  allOf,
  fallback = null,
}: PermissionGateProps) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isLoading } =
    usePermissionsContext()

  if (isLoading) {
    return <>{fallback}</>
  }

  let hasAccess = false

  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (anyOf) {
    hasAccess = hasAnyPermission(anyOf)
  } else if (allOf) {
    hasAccess = hasAllPermissions(allOf)
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>
}
