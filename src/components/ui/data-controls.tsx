import { Button, type ButtonProps } from '@mui/material'

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
