import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { useMemo, useEffect, useState } from 'react'
import type { Role } from '../../types'

interface RoleModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; permissions: string[] }) => void
  initialData?: Role | null
  isLoading?: boolean
}

import { useRoles } from '../../api/use-admins'

// Helper to format permission strings into readable labels
const formatPermissionLabel = (permission: string) => {
  const parts = permission.split('.')
  if (parts.length > 1) {
    // e.g. driver.manage_status -> Activate/Deactivate driver
    // This is a rough heuristic since we don't have a mapping.
    // We try to make it readable: "Manage status"
    const action = parts[parts.length - 1].replace(/_/g, ' ')
    return action.charAt(0).toUpperCase() + action.slice(1)
  }
  return permission
}

export const RoleModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: RoleModalProps) => {
  const [name, setName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const { data: roles = [] } = useRoles()

  // Dynamic permission aggregation
  const permissionGroups = useMemo(() => {
    const allPermissions = new Set<string>()
    // Assuming 'Super Admin' or similar roles have comprehensive permissions
    roles.forEach((role) => {
      role.permissions.forEach((p) => allPermissions.add(p))
    })

    // If no permissions found from roles (e.g. empty DB), fallback to basic known set or empty
    // But per requirement we must fetch. If empty, the UI will be empty.

    const groups: {
      category: string
      permissions: { label: string; value: string }[]
    }[] = []
    const categoryMap = new Map<string, { label: string; value: string }[]>()

    Array.from(allPermissions)
      .sort()
      .forEach((perm) => {
        const parts = perm.split('.')
        const categoryKey = parts[0]
        const categoryLabel =
          categoryKey.charAt(0).toUpperCase() +
          categoryKey.slice(1) +
          ' Management' // Heuristic

        let label = formatPermissionLabel(perm)

        // Manual overrides for specific known keys to match desired UI if they exist in DB
        if (perm === 'driver.view') label = 'View only'
        if (perm === 'driver.manage_status')
          label = 'Activate/Deactivate driver'
        if (perm === 'driver.verify') label = 'Trigger Verification'
        if (perm === 'driver.edit') label = 'Edit driver'

        if (perm === 'customer.view') label = 'View only'
        if (perm === 'customer.manage_status')
          label = 'Re-activate/Deactivate customer'
        if (perm === 'customer.verify') label = 'Trigger verification'
        if (perm === 'customer.edit') label = 'Edit customer'

        if (perm === 'pricing.view') label = 'View only'
        if (perm === 'pricing.edit') label = 'Edit'

        if (perm === 'trip.view') label = 'View Trips'

        if (perm === 'finance.commissions.view') label = 'View commissions'
        if (perm === 'finance.earnings.view') label = 'View Earnings'
        if (perm === 'finance.driver_wallet.view') label = 'View Driver Wallet'
        if (perm === 'finance.customer_wallet.view')
          label = 'View Customer Wallet'
        if (perm === 'finance.refunds.view') label = 'View Refunds'

        if (!categoryMap.has(categoryLabel)) {
          categoryMap.set(categoryLabel, [])
        }
        categoryMap.get(categoryLabel)?.push({ label, value: perm })
      })

    // Sort categories: specific order if possible, else alphabetical
    const preferredOrder = [
      'Driver Management',
      'Customer Management',
      'Pricing Management',
      'Trip Management',
      'Finance Management',
    ]

    // Convert map to array
    const sortedGroups = Array.from(categoryMap.entries()).map(
      ([category, permissions]) => ({
        category,
        permissions,
      }),
    )

    // Sort by preferred order
    sortedGroups.sort((a, b) => {
      const idxA = preferredOrder.indexOf(a.category)
      const idxB = preferredOrder.indexOf(b.category)
      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1
      return a.category.localeCompare(b.category)
    })

    return sortedGroups
  }, [roles])

  useEffect(() => {
    if (open) {
      if (initialData) {
        setName(initialData.name)
        setSelectedPermissions(initialData.permissions || [])
      } else {
        setName('')
        setSelectedPermissions([])
      }
    }
  }, [open, initialData])

  const handlePermissionChange = (value: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value],
    )
  }

  const handleSubmit = () => {
    onSubmit({ name, permissions: selectedPermissions })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <span className="text-2xl font-medium font-sans">
          {initialData ? 'Edit Role' : 'Create Role'}
        </span>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-6 pt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">
              Role name
            </label>
            <TextField
              fullWidth
              placeholder="i.e Admin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="medium"
              variant="outlined"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium font-sans">Permissions</h3>

            {permissionGroups.length === 0 && (
              <div className="text-sm text-neutral-500 italic">
                No permissions found in existing roles to assign.
              </div>
            )}

            {permissionGroups.map((group) => (
              <div key={group.category} className="space-y-2">
                <h4 className="text-sm font-semibold text-neutral-900 border-b border-neutral-100 pb-2">
                  {group.category}
                </h4>
                <div className="flex flex-col gap-1 pl-1">
                  {group.permissions.map((permission) => (
                    <FormControlLabel
                      key={permission.value}
                      control={
                        <Checkbox
                          checked={selectedPermissions.includes(
                            permission.value,
                          )}
                          onChange={() =>
                            handlePermissionChange(permission.value)
                          }
                          size="small"
                          sx={{
                            color: '#000',
                            '&.Mui-checked': {
                              color: '#000',
                            },
                            padding: '4px 9px',
                          }}
                        />
                      }
                      label={
                        <span className="text-sm text-neutral-600">
                          {permission.label}
                        </span>
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: 'neutral.200',
            color: 'black',
            textTransform: 'none',
            height: '44px',
            flex: 1,
            '&:hover': {
              borderColor: 'neutral.300',
              bgcolor: 'transparent',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!name || isLoading}
          sx={{
            bgcolor: 'black',
            color: 'white',
            textTransform: 'none',
            height: '44px',
            flex: 1,
            '&:hover': {
              bgcolor: 'neutral.800',
            },
          }}
        >
          {isLoading ? 'Saving...' : 'Save Role'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
