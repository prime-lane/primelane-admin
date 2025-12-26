import { Box, InputLabel, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AltArrowDown, AltArrowLeft, CheckCircle } from '@solar-icons/react'
import { FilterButton } from './data-controls'

export interface FilterOption {
  label: string
  key: string
  type: 'select' | 'date-range'
  options?: { label: string; value: string }[]
}

interface FilterMenuProps {
  options: FilterOption[]
  onFilterChange: (
    key: string,
    value: string | { start: Date | null; end: Date | null },
  ) => void
  activeFilters?: Record<string, any>
}

export const FilterMenu = ({
  options,
  onFilterChange,
  activeFilters = {},
}: FilterMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{
    start: Date | null
    end: Date | null
  }>({
    start: null,
    end: null,
  })

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setActiveMenu(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setActiveMenu(null)
  }

  const handleBack = () => {
    setActiveMenu(null)
  }

  const handleOptionClick = (optionKey: string) => {
    setActiveMenu(optionKey)
  }

  const handleSelectFilter = (key: string, value: string) => {
    onFilterChange(key, value)
    handleClose()
  }

  const handleDateChange = (type: 'start' | 'end', date: Date | null) => {
    const newRange = { ...dateRange, [type]: date }
    setDateRange(newRange)
    if (newRange.start && newRange.end) {
      onFilterChange(activeMenu!, newRange)
      // perform callback but keep menu open or close? usually close or verify
    }
  }

  const currentOption = options.find((opt) => opt.key === activeMenu)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FilterButton onClick={handleClick} className="space-x-2">
        <span>Filter By</span>
        <AltArrowDown size={16} color="#000" />
      </FilterButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              mt: 1,
              py: 1,
            },
          },
        }}
      >
        {!activeMenu ? (
          // Main Menu
          options.map((option) => (
            <MenuItem
              key={option.key}
              onClick={() => handleOptionClick(option.key)}
              sx={{
                py: 2,
                px: 3,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span className="text-sm">{option.label}</span>
              <AltArrowLeft
                size={16}
                style={{ transform: 'rotate(180deg)' }}
                color="#666"
              />
            </MenuItem>
          ))
        ) : (
          // Sub Menu
          <Box>
            <div
              className="flex gap-1 text-sm text-neutral-500 font-medium cursor-pointer"
              onClick={handleBack}
            >
              <AltArrowLeft size={16} />
              <span>back</span>
            </div>

            <span className="text-sm font-medium px-2">
              {currentOption?.label}
            </span>

            <div className="flex flex-col gap-2">
              {currentOption?.type === 'select' &&
                currentOption.options?.map((opt) => (
                  <MenuItem
                    key={opt.value}
                    onClick={() =>
                      handleSelectFilter(currentOption.key, opt.value)
                    }
                    selected={activeFilters[currentOption.key] === opt.value}
                    sx={{ py: '6px', px: 3, borderRadius: 1 }}
                  >
                    <div className="flex justify-between w-full">
                      <span className="text-sm">{opt.label}</span>
                      {activeFilters[currentOption.key] === opt.value && (
                        <CheckCircle size={16} color="green" />
                      )}
                    </div>
                  </MenuItem>
                ))}
            </div>

            {currentOption?.type === 'date-range' && (
              <Box
                sx={{
                  py: 1,
                  px: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box>
                  <InputLabel>Start Date</InputLabel>
                  <DatePicker
                    value={dateRange.start}
                    onChange={(date) => handleDateChange('start', date)}
                    slotProps={{
                      textField: { size: 'small', fullWidth: true },
                    }}
                  />
                </Box>
                <Box>
                  <InputLabel>End Date</InputLabel>
                  <DatePicker
                    value={dateRange.end}
                    onChange={(date) => handleDateChange('end', date)}
                    slotProps={{
                      textField: { size: 'small', fullWidth: true },
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Menu>
    </LocalizationProvider>
  )
}
