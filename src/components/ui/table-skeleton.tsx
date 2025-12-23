import { Skeleton, TableCell, TableRow } from '@mui/material'

interface TableSkeletonProps {
  rows?: number
  columns: number
  includeCheckbox?: boolean
}

export const TableSkeleton = ({
  rows = 7,
  columns,
  includeCheckbox = true,
}: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {includeCheckbox && (
            <TableCell padding="checkbox">
              <Skeleton variant="rectangular" width={18} height={18} />
            </TableCell>
          )}
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
