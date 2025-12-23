import { useState } from 'react'
import { Button, IconButton } from '@mui/material'
import { ArrowRightUp, AddCircle, MenuDots } from '@solar-icons/react'
import { useAdmins } from './api/use-admins'
import { DataTable } from '@/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { Admin } from './types'
import {
  SearchInput,
  FilterButton,
  ExportButton,
} from '@/components/ui/data-controls'
import { InviteAdminModal } from './components/invite-admin-modal'
import { StatusBadge } from '@/components/ui/status-badge'
import { format } from 'date-fns'

export const AdminManagement = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const { data, isLoading } = useAdmins({
    page,
    limit: pageSize,
    search,
  })

  // Columns definition
  const columns: ColumnDef<Admin>[] = [
    {
      accessorKey: 'id',
      header: 'Admin ID',
      cell: (info) => (
        <span className="text-sm text-neutral-900">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'last_active_at',
      header: 'Last Active',
      cell: (info) => {
        const val = info.getValue() as string
        return (
          <span className="text-sm font-medium text-neutral-900">
            {val ? format(new Date(val), 'dd/MM/yyyy') : '-'}
          </span>
        )
      },
    },
    {
      accessorKey: 'first_name',
      header: 'Name/Role',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-900">
            {row.original.first_name} {row.original.last_name}
          </span>
          <span className="text-xs text-neutral-500">{row.original.role}</span>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email Address',
      cell: (info) => (
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-sm font-medium text-neutral-900">
            {info.getValue() as string}
          </span>
          <ArrowRightUp size={16} color="#9095A1" />
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue() as any} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <IconButton size="small">
          <MenuDots size={24} color="#525866" />
        </IconButton>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">Admin Magt.</h1>
        <Button
          variant="contained"
          onClick={() => setIsInviteModalOpen(true)}
          startIcon={<AddCircle />}
          sx={{
            bgcolor: 'black',
            color: 'white',
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'neutral.800',
            },
            height: '40px',
            borderRadius: '0px',
          }}
        >
          Invite
        </Button>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by admin id, name..."
        />
        <div className="flex gap-3">
          <FilterButton>Filter</FilterButton>
          <ExportButton onClick={() => console.log('Exporting...')} />
        </div>
      </div>

      <DataTable
        data={data?.items || []}
        columns={columns}
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
