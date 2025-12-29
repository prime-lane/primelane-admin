export const getPermissionLabel = (permission: string): string => {
    const parts = permission.split(':')
    if (parts.length > 1) {
        const action = parts[parts.length - 1].replace(/_/g, ' ')
        return action.charAt(0).toUpperCase() + action.slice(1)
    }
    return permission
}

const CATEGORY_LABELS: Record<string, string> = {
    admin_management: 'Admin Management',
    customers: 'Customer Management',
    drivers: 'Driver Management',
    finance: 'Finance Management',
    price_configurations: 'Pricing Management',
    trips: 'Trip Management',
    dashboard: 'Dashboard',
    rbac: 'Role Management',
}

export const getPermissionCategory = (permission: string): string => {
    const parts = permission.split(':')
    if (parts.length === 0) return 'Other'

    const key = parts[0]
    return CATEGORY_LABELS[key] || (key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ') + ' Management')
}
