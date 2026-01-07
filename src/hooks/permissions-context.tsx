import { createContext, useContext, type ReactNode } from 'react'
import { useMe } from '@/features/auth/api/use-me'

interface PermissionsContextValue {
  permissions: string[]
  isLoading: boolean
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  hasAllPermissions: (permissions: string[]) => boolean
}

const PermissionsContext = createContext<PermissionsContextValue | undefined>(
  undefined,
)

interface PermissionsProviderProps {
  children: ReactNode
}

export const PermissionsProvider = ({ children }: PermissionsProviderProps) => {
  const { data: user, isLoading } = useMe()

  const permissions = user?.role?.permissions || []

  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission)
  }

  const hasAnyPermission = (requiredPermissions: string[]): boolean => {
    return requiredPermissions.some((permission) =>
      permissions.includes(permission),
    )
  }

  const hasAllPermissions = (requiredPermissions: string[]): boolean => {
    return requiredPermissions.every((permission) =>
      permissions.includes(permission),
    )
  }

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        isLoading,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}

export const usePermissionsContext = (): PermissionsContextValue => {
  const context = useContext(PermissionsContext)
  if (!context) {
    throw new Error(
      'usePermissionsContext must be used within PermissionsProvider',
    )
  }
  return context
}
