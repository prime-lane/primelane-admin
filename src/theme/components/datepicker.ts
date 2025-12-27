import type { Components, Theme } from '@mui/material/styles'
import type { } from '@mui/x-date-pickers/themeAugmentation'

export const MuiDatePicker: Components<Theme>['MuiDatePicker'] = {
    defaultProps: {
        slotProps: {
            textField: {
                sx: {
                    '& .MuiInputBase-root': {
                        fontSize: '12px',
                        padding: 0
                    },
                    '& .MuiPickersOutlinedInput-root': {
                        paddingTop: '0 !important',
                        paddingBottom: '0 !important',
                        height: 'auto !important',
                    },
                    '& .MuiPickersSectionList-sectionContent': {
                        fontSize: '12px',
                        padding: 0,
                    },
                    '& .MuiPickersInputBase-sectionAfter': {
                        fontSize: '12px',
                        padding: 0,
                    },
                    '& .MuiPickersInputBase-sectionBefore': {
                        fontSize: '12px',
                        padding: 0,
                    },
                    '& .MuiInputBase-input': {
                        fontSize: '12px',
                    },
                },
            },
        },
    },
}

export const MuiPickersDay: Components<Theme>['MuiPickersDay'] = {
    styleOverrides: {
        root: {
            fontSize: '14px',
            '&.Mui-selected': {
                backgroundColor: 'black !important',
                color: 'white',
                '&:hover': {
                    backgroundColor: '#333 !important',
                },
                '&:focus': {
                    backgroundColor: 'black !important',
                },
            },
        },
    },
}

export const MuiDayCalendar: Components<Theme>['MuiDayCalendar'] = {
    styleOverrides: {
        weekDayLabel: {
            fontSize: '12px !important',
            color: 'neutral.400 !important'
        },
    },
}

export const MuiPickersCalendarHeader: Components<Theme>['MuiPickersCalendarHeader'] = {
    styleOverrides: {
        label: {
            fontSize: '16px !important',
        },
    },
}
