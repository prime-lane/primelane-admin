import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { CountUp } from '@/components/ui/count-up'
import { DataTable } from '@/components/ui/data-table'
import { ErrorState } from '@/components/ui/loading-error-states'
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
  Menu,
  MenuItem,
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
}: {
  label: string
  value: React.ReactNode
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-neutral-500">{label}</span>
    <span className="text-sm font-medium text-neutral-900">{value ?? '—'}</span>
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

  const { data: coupon, isLoading, error } = useCoupon(id!)
  const { data: usageData, isLoading: isUsageLoading } = useCouponUsage(id!, {
    page,
    page_size: pageSize,
  })
  const { mutate: toggleCoupon } = useToggleCoupon(id!)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const [isExporting, setIsExporting] = useState(false)

  const [tabValue, setTabValue] = useQueryState('tab', {
    defaultValue: 'overview',
    parse: (v) => v,
    serialize: (v) => v,
  })
  const activeIndex = tabValue === 'usage' ? 1 : 0

  if (isLoading) return <CouponDetailsSkeleton />
  if (error || !coupon) return <ErrorState message="Failed to load coupon" />

  const isActive = coupon.is_active

  const scopeLabel =
    (coupon.applicable_ride_types || [])
      .map((r) => RIDE_TYPE_LABELS[r] || r)
      .join(' & ') || 'All'

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
            <h1 className="text-2xl font-bold text-neutral-900">
              Coupon details
            </h1>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '2px 10px',
                borderRadius: '999px',
                fontWeight: 500,
                backgroundColor: isActive ? '#22C55E1A' : '#EF44441A',
                color: isActive ? '#16A34A' : '#DC2626',
              }}
            >
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <span className="text-sm text-neutral-500">
            Date Created:{' '}
            {coupon.created_at
              ? format(new Date(coupon.created_at), 'dd/MM/yyyy, HH:mm')
              : '—'}
          </span>
        </div>

        <div>
          <Button
            variant="contained"
            endIcon={<AltArrowDown />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              bgcolor: 'black',
              color: 'white',
              textTransform: 'none',
              '&:hover': { bgcolor: 'neutral.800' },
            }}
          >
            Action
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null)
                navigate(path.DASHBOARD.COUPON_EDIT.replace(':id', id!))
              }}
            >
              <span className="text-sm text-neutral-600">Edit Coupon</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null)
                handleExportUsage()
              }}
              disabled={isExporting}
            >
              <span className="text-sm text-neutral-600">
                {isExporting ? 'Exporting...' : 'Export Usage Record'}
              </span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null)
                toggleCoupon(isActive ? 'deactivate' : 'activate')
              }}
              sx={{ bgcolor: isActive ? '#FFF0F0' : '#F0FFF4' }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: isActive ? '#DC2626' : '#16A34A' }}
              >
                {isActive ? 'Disable Coupon' : 'Enable Coupon'}
              </span>
            </MenuItem>
          </Menu>
        </div>
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
            <h3 className="text-sm font-semibold text-neutral-700">
              Coupon details
            </h3>
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              <InfoCell
                label="Code"
                value={<span className="font-bold">{coupon.code}</span>}
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
                    <p className="text-2xl font-bold">
                      <CountUp value={coupon.usage_count} />
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
                    <p className="text-2xl font-bold">
                      {coupon.usage_limit != null ? (
                        <CountUp
                          value={coupon.usage_limit - coupon.usage_count}
                        />
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

      {/* Usage Record */}
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
