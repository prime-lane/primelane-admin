export const getPermissionLabel = (permission: string): string => {
    const parts = permission.split('.')
    if (parts.length > 1) {
        const action = parts[parts.length - 1].replace(/_/g, ' ')
        return action.charAt(0).toUpperCase() + action.slice(1)
    }
    return permission
}

export const getPermissionCategory = (permission: string): string => {
    const parts = permission.split('.')
    if (parts.length === 0) return 'Other'

    const categoryKey = parts[0]
    return categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1) + ' Management'
}
