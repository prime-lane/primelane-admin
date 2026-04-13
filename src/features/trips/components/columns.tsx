import { type ColumnDef } from '@tanstack/react-table'
import { type Trip } from '../types'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatDate } from '@/utils/table-utils'
import { formatCurrency, fromKobo } from '@/lib/utils'
import { useVehicleCategories } from '@/features/pricing-config/api/use-vehicle-categories'
import { CopyButton } from '@/components/ui/copy-button'

export const useTripColumns = (): ColumnDef<Trip>[] => {
  const { data: categoriesData } = useVehicleCategories()

  const getCategoryName = (categoryId?: string | null): string => {
    if (!categoryId) return 'N/A'
    if (!categoriesData?.categories) return categoryId

    const category = categoriesData.categories.find(
      (cat) => cat.id === categoryId,
    )
    return category?.name || categoryId
  }

  return [
    {
      accessorKey: 'id',
      header: 'Trip ID',
      cell: ({ row }) => (
        <div className="flex items-center gap-[2px]">
          <span className="text-sm">{row.original?.custom_ride_id}</span>
          <CopyButton textToCopy={row.original?.custom_ride_id} />
        </div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Trip Date',
      cell: ({ row }) => (
        <span className="text-sm">{formatDate(row.original?.created_at)}</span>
      ),
    },
    {
      accessorKey: 'rider_id',
      header: 'Rider Name/ID',
      cell: ({ row }) => (
        <div className="flex flex-col gap-[2px]">
          <span className="text-sm font-medium">
            {row.original.rider
              ? `${row.original.rider.first_name} ${row.original.rider.last_name}`
              : 'N/A'}
          </span>
          <span className="text-xs text-gray-500">
            #{row.original?.rider_id?.substring(0, 8).toUpperCase()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'driver_id',
      header: 'Driver Name/ID',
      cell: ({ row }) => (
        <div className="flex flex-col gap-[2px]">
          <span className="text-sm font-medium">
            {row.original.driver
              ? `${row.original.driver.first_name} ${row.original.driver.last_name}`
              : 'N/A'}
          </span>
          {row.original.driver_id && (
            <span className="text-xs text-gray-500">
              #{row.original?.driver_id?.substring(0, 8).toUpperCase()}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'ride_type',
      header: 'Trip Type',
      cell: ({ row }) => (
        <span className="text-sm">{row.original.ride_type || 'N/A'}</span>
      ),
    },
    {
      accessorKey: 'vehicle_category',
      header: 'Vehicle Category',
      cell: ({ row }) => (
        <span className="text-sm">
          {getCategoryName(row.original.category_id)}
        </span>
      ),
    },
    {
      accessorKey: 'actual_fare',
      header: 'Actual Fare',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.actual_fare
            ? `${formatCurrency(fromKobo(row.original.actual_fare))}`
            : 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'driver_commission',
      header: "Driver's Earning",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.driver_commission
            ? `${formatCurrency(fromKobo(row.original.driver_commission))}`
            : 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'commission',
      header: 'Commission',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.commission
            ? `${formatCurrency(fromKobo(row.original.commission))}`
            : 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'calculation_fee',
      header: 'Cancellation Fee',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.cancellation_fee
            ? `${formatCurrency(fromKobo(row.original.cancellation_fee))}`
            : 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Trip Status',
      cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
    },
  ]
}
