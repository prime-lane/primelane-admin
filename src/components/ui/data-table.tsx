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

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  enableRowSelection?: boolean
  pageSize?: number
}

export function DataTable<T>({
  data,
  columns,
  enableRowSelection = true,
  pageSize: initialPageSize = 7,
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
    },
    enableRowSelection,
  })

  const totalPages = table.getPageCount()
  const currentPage = pagination.pageIndex + 1

  return (
    <div>
      <TableContainer component={Paper} elevation={0} sx={{ border: '0' }}>
        <Table>
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
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  cursor: enableRowSelection ? 'pointer' : 'default',
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pagination.pageSize}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        onPageSizeChange={(size) => {
          setPagination({ pageIndex: 0, pageSize: size })
        }}
        totalItems={data.length}
      />
    </div>
  )
}
