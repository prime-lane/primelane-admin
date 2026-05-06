import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { CountUp } from '@/components/ui/count-up'
import { DataTable } from '@/components/ui/data-table'
import { ErrorState } from '@/components/ui/loading-error-states'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  CustomTabPanel as TabPanel,
  a11yProps,
} from '@/components/ui/tab-panel'
import { formatCurrency, fromKobo } from '@/lib/utils'
import {
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
} from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryState } from 'nuqs'
import { useCoupon, useCouponUsage, useToggleCoupon } from './api/use-coupons'
import type { CouponUsageRecord } from './types'
import { useTableParams } from '@/hooks/use-table-params'
import { downloadExport } from '@/utils/export-utils'
import { CouponDetailsSkeleton } from './components/skeletons'
import { useVehicleCategories } from '@/features/pricing-config/api/use-vehicle-categories'
import { CouponActionMenu } from './components/coupon-action-menu'
import { CopyButton } from '@/components/ui/copy-button'

const usageColumns: ColumnDef<CouponUsageRecord>[] = [
  {
    accessorKey: 'user',
    header: 'Customer name/ID',
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-neutral-900">
          {row.original.user
            ? `${row.original.user.first_name} ${row.original.user.last_name}`
            : '—'}
        </span>
        <span className="text-xs text-neutral-500">
          {row.original.user_id?.substring(0, 9)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Date Created',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {format(new Date(row.original.created_at), 'dd/MM/yyyy')}
      </span>
    ),
  },
  {
    accessorKey: 'ride_id',
    header: 'Booking ID',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original.ride_id || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Customer email',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original.user?.email || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'discount_applied',
    header: 'Discount applied',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {formatCurrency(fromKobo(row.original.discount_applied))}
      </span>
    ),
  },
]

const InfoCell = ({
  label,
  value,
  canCopy
}: {
  label: string
  value: React.ReactNode,
  canCopy?: boolean
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-neutral-500">{label}</span>
    <div className="flex gap-1 items-center">
      <span className="text-sm font-normal text-neutral-900">{value ?? '—'}</span>
      {canCopy && typeof value === 'string' && <CopyButton textToCopy={value} />}
    </div>
  </div>
)

const RIDE_TYPE_LABELS: Record<string, string> = {
  airport_transfer: 'Airport transfers',
  daily: 'Daily rentals',
  daily_rental: 'Daily rentals',
  fleet: 'Fleet rentals',
  fleet_rental: 'Fleet rentals',
}

export const CouponDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { page, setPage, pageSize, setPageSize } = useTableParams()

  const { data: couponData, isLoading, error } = useCoupon(id!)
  const { data: usageData, isLoading: isUsageLoading } = useCouponUsage(id!, {
    page,
    page_size: pageSize,
  })
  console.log(usageData)
  const { data: vehicleCategories } = useVehicleCategories()
  const { mutate: toggleCoupon } = useToggleCoupon(id!)

  const [isExporting, setIsExporting] = useState(false)

  const [tabValue, setTabValue] = useQueryState('tab', {
    defaultValue: 'overview',
    parse: (v) => v,
    serialize: (v) => v,
  })
  const activeIndex = tabValue === 'usage' ? 1 : 0

  if (isLoading) return <CouponDetailsSkeleton />
  if (error || !couponData) return <ErrorState message="Failed to load coupon" />

  const { coupon, total_uses, remaining_uses } = couponData

  const isActive = coupon.is_active

  const categoryNameById = new Map(
    (vehicleCategories?.categories || []).map((cat) => [cat.id, cat.name]),
  )

  const rideScope =
    (coupon.applicable_ride_types || [])
      .map((r) => RIDE_TYPE_LABELS[r] || r)
      .join(' & ') || 'All'

  const categoryScope = (coupon.applicable_category_ids || [])
    .map((id) => categoryNameById.get(id) || id)
    .join(', ')

  const scopeLabel = categoryScope ? `${rideScope} • ${categoryScope}` : rideScope

  const handleExportUsage = async () => {
    setIsExporting(true)
    try {
      await downloadExport(`/coupons/${id}/usage`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <AppBreadcrumbs
        items={[
          { label: 'Coupons', to: path.DASHBOARD.COUPONS },
          {
            label: coupon.code,
            to: path.DASHBOARD.COUPON_DETAILS.replace(':id', id!),
          },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl">
              Coupon details
            </h1>
            <StatusBadge status={isActive ? 'active' : 'inactive'} />
          </div>
          <span className="text-sm text-neutral-500">
            Date Created:{' '}
            {coupon.created_at
              ? format(new Date(coupon.created_at), 'dd/MM/yyyy, HH:mm')
              : '—'}
          </span>
        </div>

        <CouponActionMenu
          coupon={coupon}
          isExporting={isExporting}
          onEdit={() => navigate(path.DASHBOARD.COUPON_EDIT.replace(':id', id!))}
          onExportUsage={handleExportUsage}
          onToggle={(selectedCoupon) => toggleCoupon(!selectedCoupon.is_active)}
          trigger={(openMenu) => (
            <Button
              variant="contained"
              endIcon={<AltArrowDown />}
              onClick={openMenu}
              sx={{
                bgcolor: 'black',
                color: 'white',
                textTransform: 'none',
                '&:hover': { bgcolor: 'neutral.800' },
              }}
            >
              Action
            </Button>
          )}
        />
      </div>

      {/* Tabs */}
      <Tabs
        value={activeIndex}
        onChange={(_, v) => setTabValue(v === 1 ? 'usage' : 'overview')}
      >
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Usage Record" {...a11yProps(1)} />
      </Tabs>

      {/* Overview */}
      <TabPanel value={activeIndex} index={0}>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              <InfoCell
                label="Code"
                value={coupon.code}
                canCopy
              />
              <InfoCell
                label="Coupon type"
                value={
                  coupon.discount_type === 'fixed'
                    ? 'Fixed amount'
                    : 'Percentage'
                }
              />
              <InfoCell
                label="Usage"
                value={
                  coupon.usage_type === 'one_time'
                    ? 'One-time per customer'
                    : 'Multiple use'
                }
              />
              <InfoCell label="Description" value={coupon.description} />
              <InfoCell
                label="Value"
                value={
                  coupon.discount_type === 'fixed'
                    ? formatCurrency(fromKobo(coupon.discount_value))
                    : `${coupon.discount_value}%`
                }
              />
              <InfoCell
                label="Usage limit"
                value={coupon.usage_limit ? String(coupon.usage_limit) : 'None'}
              />
              <InfoCell
                label="Validity - Start date"
                value={
                  coupon.starts_at
                    ? format(new Date(coupon.starts_at), 'dd/MM/yyyy, HH:mm')
                    : '—'
                }
              />
              <InfoCell
                label="Validity - End date"
                value={
                  coupon.expires_at
                    ? format(new Date(coupon.expires_at), 'dd/MM/yyyy, HH:mm')
                    : '—'
                }
              />
              <InfoCell label="Scope" value={`${scopeLabel}`} />
            </div>
          </div>

          {/* Usage summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-neutral-700">
              Usage Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Card sx={{ bgcolor: 'neutral.50' }} elevation={0}>
                <CardContent>
                  <div className="flex flex-col gap-2 items-center py-2">
                    <span className="text-sm text-neutral-500">
                      No. of Uses
                    </span>
                    <p className="text-2xl font-semibold">
                      <CountUp value={total_uses} />
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card sx={{ bgcolor: 'neutral.50' }} elevation={0}>
                <CardContent>
                  <div className="flex flex-col gap-2 items-center py-2">
                    <span className="text-sm text-neutral-500">
                      Remaining Uses
                    </span>
                    <p className="text-2xl font-semibold">
                      {remaining_uses != null ? (
                        <CountUp value={remaining_uses} />
                      ) : (
                        '—'
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={activeIndex} index={1}>
        <Box>
          <DataTable
            data={usageData?.items || []}
            columns={usageColumns}
            isLoading={isUsageLoading}
            pagination={
              usageData?.pagination
                ? {
                  currentPage: Number(usageData.pagination.current_page),
                  totalPages: usageData.pagination.total_pages,
                  totalItems: usageData.pagination.total_items,
                }
                : undefined
            }
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size)
              setPage(1)
            }}
          />
        </Box>
      </TabPanel>
    </div>
  )
}
