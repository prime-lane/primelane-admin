import {
  Button,
  type ButtonProps,
  TextField,
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

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search by name, ID, phone number',
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
      }}
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
  // totalItems,
}: TablePaginationProps) => {
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
        Page {currentPage} of {totalPages}
      </span>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          size="small"
        >
          <AltArrowLeft size={20} color="#525866" />
        </IconButton>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1
          return (
            <IconButton
              key={page}
              onClick={() => onPageChange(page)}
              size="small"
              sx={{
                border: '1px solid',
                borderColor: page === currentPage ? 'black' : '#E2E4E9',
                bgcolor: page === currentPage ? 'black' : 'transparent',
                color: page === currentPage ? 'white' : '#0A0D14',
                '&:hover': {
                  bgcolor: page === currentPage ? 'neutral.900' : 'neutral.100',
                },
                width: '32px',
                height: '32px',
                borderRadius: '0',
                fontSize: '12px',
              }}
            >
              {page}
            </IconButton>
          )
        })}

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
            sx={{
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'neutral.200',
              },
            }}
          >
            <MenuItem value={7}><span className="text-sm text-neutral-500">7 / page</span></MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  )
}
