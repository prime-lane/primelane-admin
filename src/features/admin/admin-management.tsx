import {
  ExportButton,
  FilterButton,
  SearchInput,
} from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Box, Button } from '@mui/material'
import { UserPlus } from '@solar-icons/react'
import { useState } from 'react'
import { useAdmins } from './api/use-admins'
import { adminColumns } from './components/columns'
import { InviteAdminModal } from './components/invite-admin-modal'

import { useDebounce } from '@/hooks/use-debounce'

export const AdminManagement = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading } = useAdmins({
    page,
    page_size: pageSize,
    search: debouncedSearch,
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Management"
        action={
          <Button
            variant="contained"
            onClick={() => setIsInviteModalOpen(true)}
            endIcon={<UserPlus />}
          >
            Invite
          </Button>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by admin id, name..."
          />
        </Box>
        <div className="flex gap-3">
          <FilterButton>Filter</FilterButton>
          <ExportButton onClick={() => console.log('Exporting...')} />
        </div>
      </Box>

      <DataTable
        data={data?.items || []}
        columns={adminColumns}
        isLoading={isLoading}
        pagination={{
          currentPage:
            typeof data?.pagination?.current_page === 'string'
              ? parseInt(data.pagination.current_page)
              : data?.pagination?.current_page || 1,
          totalPages: data?.pagination?.total_pages || 1,
          totalItems: data?.pagination?.total_items || 0,
        }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <InviteAdminModal
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  )
}
