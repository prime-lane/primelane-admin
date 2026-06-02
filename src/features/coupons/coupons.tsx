import { path } from '@/app/paths'
import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { FilterMenu, type FilterOption } from '@/components/ui/filter-menu'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { useTableParams } from '@/hooks/use-table-params'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import { downloadExport } from '@/utils/export-utils'
import { buildQueryParams } from '@/lib/utils'
import { Box, Button } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { parseAsString, useQueryState } from 'nuqs'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCoupons } from './api/use-coupons'
import { getCouponColumns } from './components/columns'
import type { Coupon } from './types'
import { usePermissionsContext } from '@/hooks/permissions-context'

export const Coupons = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { hasPermission } = usePermissionsContext()
  const { page, setPage, pageSize, setPageSize, search, setSearch } =
    useTableParams()
  const debouncedSearch = useDebounce(search, 500)

  const [status, setStatus] = useQueryState('status', parseAsString)

  const { data, isLoading, error } = useCoupons({
    page,
    page_size: pageSize,
    search: debouncedSearch,
    status: status || undefined,
  })

  const handleEdit = useCallback(
    (coupon: Coupon) => {
      navigate(path.DASHBOARD.COUPON_EDIT.replace(':id', coupon.id))
    },
    [navigate],
  )

  const handleExportUsage = useCallback(async (coupon: Coupon) => {
    await downloadExport(`/coupons/${coupon.id}/usage`)
  }, [])

  const handleToggle = useCallback(
    async (coupon: Coupon) => {
      try {
        const nextStatus = !coupon.is_active
        await apiClient.patch(e.COUPONS.TOGGLE(coupon.id), {
          is_active: nextStatus,
        })
        toast.success(
          `Coupon ${nextStatus ? 'enabled' : 'disabled'} successfully`,
        )
        queryClient.invalidateQueries({ queryKey: ['coupons'] })
      } catch {
        toast.error('Failed to update coupon status')
      }
    },
    [queryClient],
  )

  const handleFilterChange = (
    key: string,
    value: string | { start: Date | null; end: Date | null },
  ) => {
    setPage(1)
    if (key === 'status') {
      const v = value as string
      setStatus(v === 'all' ? null : v)
    }
  }

  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    const params = buildQueryParams({
      search: debouncedSearch || undefined,
      status: status || undefined,
    })
    const qs = params.toString()
    setIsExporting(true)
    try {
      await downloadExport(`/coupons${qs ? `?${qs}` : ''}`)
    } finally {
      setIsExporting(false)
    }
  }

  const columns = useMemo(
    () => getCouponColumns(handleEdit, handleExportUsage, handleToggle),
    [handleEdit, handleExportUsage, handleToggle],
  )

  const filterOptions: FilterOption[] = [
    {
      label: 'Status',
      key: 'status',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ]

  if (error) return <ErrorState message="Failed to load coupons" />

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Coupons</h1>
        {hasPermission('coupons:create') && (
          <Button
            variant="contained"
            onClick={() => navigate(path.DASHBOARD.COUPON_CREATE)}
            endIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16663 10.0003H15.8333M9.99996 4.16699V15.8337"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            CREATE COUPON
          </Button>
        )}
      </div>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by code..."
          />
        </Box>
        <div className="flex gap-3">
          <FilterMenu
            options={filterOptions}
            onFilterChange={handleFilterChange}
            activeFilters={{ status: status || 'all' }}
          />
          {hasPermission('coupons:export') && (
            <ExportButton onClick={handleExport} isLoading={isExporting} />
          )}
        </div>
      </Box>

      <DataTable
        data={data?.items || []}
        columns={columns}
        isLoading={isLoading}
        onRowClick={(row: Coupon) =>
          navigate(path.DASHBOARD.COUPON_DETAILS.replace(':id', row.id))
        }
        pagination={
          data?.pagination
            ? {
                currentPage: Number(data.pagination.current_page),
                totalPages: data.pagination.total_pages,
                totalItems: data.pagination.total_items,
              }
            : undefined
        }
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
      />
    </div>
  )
}
