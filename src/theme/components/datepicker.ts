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
