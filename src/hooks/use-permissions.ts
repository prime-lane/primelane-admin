import { usePermissionsContext } from './permissions-context'

export const useHasPermission = (permission: string): boolean => {
    const { hasPermission } = usePermissionsContext()
    return hasPermission(permission)
}

export const useHasAnyPermission = (permissions: string[]): boolean => {
    const { hasAnyPermission } = usePermissionsContext()
    return hasAnyPermission(permissions)
}

export const useHasAllPermissions = (permissions: string[]): boolean => {
    const { hasAllPermissions } = usePermissionsContext()
    return hasAllPermissions(permissions)
}

export const useCanView = (resource: string): boolean => {
    return useHasPermission(`${resource}:view`)
}

export const useCanCreate = (resource: string): boolean => {
    return useHasPermission(`${resource}:create`)
}

export const useCanEdit = (resource: string): boolean => {
    return useHasPermission(`${resource}:edit`)
}

export const useCanDelete = (resource: string): boolean => {
    return useHasPermission(`${resource}:delete`)
}

export const usePermissions = () => {
    const { permissions, isLoading } = usePermissionsContext()
    return { permissions, isLoading }
}
