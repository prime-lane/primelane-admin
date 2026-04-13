import { Chip } from '@mui/material'
import { CloseCircle } from '@solar-icons/react'
import { format } from 'date-fns'

export interface ActiveFilter {
  key: string
  label: string
  displayValue: string
}

interface FilterChipsProps {
  activeFilters: ActiveFilter[]
  onRemove: (key: string) => void
}

export const FilterChips = ({ activeFilters, onRemove }: FilterChipsProps) => {
  if (activeFilters.length === 0) return null

  return (
    <div className="flex gap-2 flex-wrap">
      {activeFilters.map((filter) => (
        <Chip
          key={filter.key}
          label={filter.displayValue}
          onDelete={() => onRemove(filter.key)}
          deleteIcon={
            <CloseCircle size={16} className="text-neutral-400 font-medium" />
          }
          sx={{
            borderRadius: 1,
            px: '12px',
            height:'44px',
            fontSize: 14,
            bgcolor: 'neutral.100',
            color: 'neutral.500',
            fontWeight: 'medium',
          }}
        />
      ))}
    </div>
  )
}

export const formatDateRange = (
  start: string | null,
  end: string | null,
): string => {
  if (!start || !end) return ''
  return `${format(new Date(start), 'dd/MM/yy')} - ${format(new Date(end), 'dd/MM/yy')}`
}
