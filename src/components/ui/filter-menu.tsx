import { Box, colors, InputLabel, Menu, MenuItem } from '@mui/material'
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
} from 'date-fns'
import { useState } from 'react'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AltArrowDown, AltArrowLeft, CheckCircle } from '@solar-icons/react'
import { FilterButton } from './data-controls'

const dateFilterOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This month', value: 'this_month' },
  { label: 'This year', value: 'this_year' },
  { label: 'Custom date', value: 'custom' },
]

const statusStyles: Record<string, { bgcolor: string; color: string }> = {
  pending: { bgcolor: colors.orange[50], color: colors.orange[500] },
  active: { bgcolor: colors.green[50], color: colors.green[500] },
  deactivated: { bgcolor: colors.red[50], color: colors.red[500] },
}

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

type DatePreset =
  | 'today'
  | 'yesterday'
  | 'this_month'
  | 'this_year'
  | 'custom'
  | null

export const FilterMenu = ({
  options,
  onFilterChange,
  activeFilters = {},
}: FilterMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeDatePreset, setActiveDatePreset] = useState<DatePreset>(null)
  const [dateRange, setDateRange] = useState<{
    start: Date | null
    end: Date | null
  }>({
    start: null,
    end: null,
  })

  const isCustomDateRange = activeDatePreset === 'custom'

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setActiveMenu(null)
    setActiveDatePreset(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setActiveMenu(null)
  }

  const handleBack = () => {
    setActiveMenu(null)
    setActiveDatePreset(null)
  }

  const handleOptionClick = (optionKey: string) => {
    setActiveMenu(optionKey)
  }

  const handleSelectFilter = (key: string, value: string) => {
    onFilterChange(key, value)
    handleClose()
  }

  const handlePresetClick = (preset: DatePreset) => {
    setActiveDatePreset(preset)
    if (preset === 'custom') return

    const now = new Date()
    let start: Date | null = null
    let end: Date | null = null

    switch (preset) {
      case 'today':
        start = startOfDay(now)
        end = endOfDay(now)
        break
      case 'yesterday':
        const yesterday = subDays(now, 1)
        start = startOfDay(yesterday)
        end = endOfDay(yesterday)
        break
      case 'this_month':
        start = startOfMonth(now)
        end = endOfMonth(now)
        break
      case 'this_year':
        start = startOfYear(now)
        end = endOfYear(now)
        break
    }

    if (start && end) {
      onFilterChange(activeMenu!, { start, end })
      handleClose()
    }
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
              width:
                activeMenu && currentOption?.type === 'date-range'
                  ? isCustomDateRange
                    ? 620
                    : 250
                  : 250,
              mt: 1,
              py: 1,
              px: 4,
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
                py: 3,
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
              className={`flex gap-1 text-sm text-neutral-500 font-medium cursor-pointer ${
                currentOption?.type === 'date-range' ? 'px-4 pb-2' : '' // Added padding for date range view
              }`}
              onClick={handleBack}
            >
              <AltArrowLeft size={16} />
              <span>back</span>
            </div>

            {/* {currentOption?.type !== 'date-range' && (
              <span className="text-sm font-medium px-2 block mb-2">
                {currentOption?.label}
              </span>
            )} */}

            <div className="flex flex-col gap-2">
              {currentOption?.type === 'select' &&
                currentOption.options?.map((opt) => {
                  const statusStyle = statusStyles[opt.value]

                  return (
                    <MenuItem
                      key={opt.value}
                      onClick={() =>
                        handleSelectFilter(currentOption.key, opt.value)
                      }
                      selected={activeFilters[currentOption.key] === opt.value}
                      sx={{
                        py: 3,
                        px: 3,
                        bgcolor: statusStyle
                          ? `${statusStyle.bgcolor} !important`
                          : undefined,
                        color: statusStyle
                          ? `${statusStyle.color} !important`
                          : undefined,
                      }}
                    >
                      <div className="flex justify-between w-full">
                        <span className="text-sm mx-auto">{opt.label}</span>
                        {activeFilters[currentOption.key] === opt.value && (
                          <CheckCircle size={16} color="green" />
                        )}
                      </div>
                    </MenuItem>
                  )
                })}
            </div>

            {currentOption?.type === 'date-range' && (
              <Box sx={{ display: 'flex', height: '100%' }}>
                {/* Preset List, controls the date picker options */}
                <Box
                  sx={{
                    width: isCustomDateRange ? '30%' : '100%',
                    borderRight: isCustomDateRange ? 1 : 0,
                    borderColor: 'divider',
                  }}
                >
                  {dateFilterOptions.map((preset) => (
                    <MenuItem
                      key={preset.value}
                      onClick={() =>
                        handlePresetClick(preset.value as DatePreset)
                      }
                      selected={activeDatePreset === preset.value}
                      sx={{
                        py: 3,
                        px: 3,
                        fontSize: '16px',
                        '&.Mui-selected': {
                          bgcolor: 'transparent',
                          color: 'text.primary',
                          fontWeight: 500,
                        },
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <span className="mx-auto">{preset.label}</span>
                    </MenuItem>
                  ))}
                </Box>

                {/* Custom Date Pickers */}
                {isCustomDateRange && (
                  <Box
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      width: 400,
                      overflowX: 'auto',
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <div className="space-y-4">
                        <Box sx={{ flex: 1 }}>
                          <InputLabel sx={{ mb: 1, fontSize: 12 }}>
                            Start Date
                          </InputLabel>
                          <DatePicker
                            value={dateRange.start}
                            onChange={(date) => handleDateChange('start', date)}
                            slotProps={{
                              textField: { size: 'small', fullWidth: true },
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <InputLabel sx={{ mb: 1, fontSize: 12 }}>
                            End Date
                          </InputLabel>
                          <DatePicker
                            value={dateRange.end}
                            onChange={(date) => handleDateChange('end', date)}
                            slotProps={{
                              textField: { size: 'small', fullWidth: true },
                            }}
                          />
                        </Box>
                      </div>
                    </LocalizationProvider>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </Menu>
    </LocalizationProvider>
  )
}
