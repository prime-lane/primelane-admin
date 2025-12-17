import {
  Button,
  type ButtonProps,
  TextField,
  type TextFieldProps,
  Box,
  IconButton,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import { Magnifer, AltArrowLeft, AltArrowRight } from '@solar-icons/react'

interface FilterButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'outlined' | 'contained' | 'text'
}

export const FilterButton = ({
  children = 'Filter by',
  variant = 'outlined',
  sx,
  ...props
}: FilterButtonProps) => {
  return (
    <Button
      variant={variant}
      sx={{
        border: '1px solid',
        borderColor: 'neutral.200',
        color: 'neutral.500',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

interface SearchInputProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search by name, ID, phone number',
  sx,
  ...props
}: SearchInputProps) => {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      size="medium"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Magnifer />{' '}
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          width: '340px',
        },
        ...sx,
      }}
      {...props}
    />
  )
}

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  totalItems: number
}

export const TablePagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalItems,
}: TablePaginationProps) => {
  const startParam = (currentPage - 1) * pageSize + 1
  const endParam = Math.min(currentPage * pageSize, totalItems)

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <IconButton
          key={i}
          onClick={() => onPageChange(i)}
          size="small"
          sx={{
            border: '1px solid',
            borderColor: i === currentPage ? 'black' : '#E2E4E9',
            bgcolor: i === currentPage ? 'black' : 'transparent',
            color: i === currentPage ? 'white' : '#0A0D14',
            '&:hover': {
              bgcolor: i === currentPage ? 'neutral.900' : 'neutral.100',
            },
            width: '32px',
            height: '32px',
            borderRadius: '0',
            fontSize: '12px',
          }}
        >
          {i}
        </IconButton>,
      )
    }
    return pages
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'space-between',
        mt: 2,
      }}
    >
      <span className="text-sm text-neutral-500">
        {totalItems > 0
          ? `Showing ${startParam} - ${endParam} of ${totalItems}`
          : 'No results found'}
      </span>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          size="small"
        >
          <AltArrowLeft size={20} color="#525866" />
        </IconButton>

        {renderPageNumbers()}

        <IconButton
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          size="small"
        >
          <AltArrowRight size={20} color="#525866" />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <Select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            size="small"
            displayEmpty
            sx={{
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'neutral.200',
              },
            }}
          >
            {[10, 20, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                <span className="text-sm text-neutral-500">{size} / page</span>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  )
}
