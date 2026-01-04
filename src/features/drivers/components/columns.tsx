import { type ColumnDef } from '@tanstack/react-table'
import type { Driver } from '../types'
import { StatusBadge } from '@/components/ui/status-badge'
import { VerificationBadge } from '@/components/ui/verification-badge'
import { formatDate } from '@/utils/table-utils'
import { useVehicleCategories } from '@/features/pricing-config/api/use-vehicle-categories'
import { CopyButton } from '@/components/ui/copy-button'

export const useDriverColumns = (): ColumnDef<Driver>[] => {
  const { data: categoriesData } = useVehicleCategories()

  const getCategoryNames = (categoryIds?: string[] | null): string => {
    if (!categoryIds || categoryIds.length === 0) return 'N/A'
    if (!categoriesData?.categories) return categoryIds.join(', ')

    const names = categoryIds
      .map((id) => categoriesData.categories.find((cat) => cat.id === id)?.name)
      .filter(Boolean)

    return names.length > 0 ? names.join(', ') : 'N/A'
  }

  return [
    {
      accessorKey: 'custom_user_id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="flex gap-[2px]">
          <span className="text-sm">{row.original?.custom_user_id?.substring(0, 8)}...</span>
          <CopyButton textToCopy={row.original?.custom_user_id}/>
        </div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Date Joined',
      cell: ({ row }) => (
        <span className="text-sm">{formatDate(row.original.created_at)}</span>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Driver name',
      cell: ({ row }) => (
        <div className="flex flex-col gap-[2px]">
          <span className="text-sm font-medium">
            {row.original.first_name} {row.original.last_name}
          </span>
          {/* <span className="text-sm text-neutral-500">{row.original.email}</span> */}
        </div>
      ),
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone number',
      cell: ({ row }) => (
        <span className="text-sm">{row.original.phone_number || 'N/A'}</span>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <span className="text-sm">{row.original.email || 'N/A'}</span>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Vehicle Category',
      cell: ({ row }) => (
        <span className="text-sm">
          {getCategoryNames(row.original.vehicle?.category_ids)}
        </span>
      ),
    },
    /*
  {
    accessorKey: 'vehicleCategory',
    header: 'Vehicle Category',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.vehicleCategory}</span>
    ),
  },
  */
    {
      accessorKey: 'status',
      header: 'Account status',
      cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
    },
    {
      accessorKey: 'is_email_verified',
      header: 'ID Verification',
      cell: ({ row }) => (
        <VerificationBadge verified={row.original.is_email_verified} />
      ),
    },
  ]
}
