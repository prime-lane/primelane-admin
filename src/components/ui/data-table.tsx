import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material'
import { TablePagination } from './data-controls'

import { TableSkeleton } from './table-skeleton'

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  enableRowSelection?: boolean
  pageSize?: number
  onRowClick?: (row: T) => void
  isLoading?: boolean
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function DataTable<T>({
  data,
  columns,
  enableRowSelection = true,
  pageSize: initialPageSize = 7,
  onRowClick,
  isLoading = false,
  pagination: backendPagination,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const useFrontendPagination = !backendPagination

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: useFrontendPagination
      ? getPaginationRowModel()
      : undefined,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
    },
    enableRowSelection,
    manualPagination: !useFrontendPagination,
    pageCount: backendPagination?.totalPages ?? -1,
  })

  const totalPages = backendPagination?.totalPages ?? table.getPageCount()
  const currentPage = backendPagination?.currentPage ?? pagination.pageIndex + 1
  const totalItems = backendPagination?.totalItems ?? data.length

  return (
    <div>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ overflowX: 'auto', width: '100%' }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: 'neutral.50' }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {enableRowSelection && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={table.getIsAllRowsSelected()}
                      indeterminate={table.getIsSomeRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                      size="small"
                    />
                  </TableCell>
                )}
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    <span className="text-xs text-neutral-400 font-normal">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableSkeleton
                rows={pagination.pageSize}
                columns={columns.length}
                includeCheckbox={enableRowSelection}
              />
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={(e) => {
                    const target = e.target as HTMLElement
                    if (target.closest('button, a, [role="button"]')) {
                      return
                    }
                    onRowClick?.(row.original)
                  }}
                  sx={{
                    cursor:
                      onRowClick || enableRowSelection ? 'pointer' : 'default',
                    '&:hover': {
                      bgcolor: 'neutral.50',
                    },
                  }}
                >
                  {enableRowSelection && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        size="small"
                      />
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pagination.pageSize}
        onPageChange={(page) => {
          if (onPageChange) {
            onPageChange(page)
          } else {
            table.setPageIndex(page - 1)
          }
        }}
        onPageSizeChange={(size) => {
          if (onPageSizeChange) {
            onPageSizeChange(size)
          } else {
            setPagination({ pageIndex: 0, pageSize: size })
          }
        }}
        totalItems={totalItems}
      />
    </div>
  )
}
