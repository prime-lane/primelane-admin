import { Breadcrumbs, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface AppBreadcrumbsProps {
  items: BreadcrumbItem[]
}

export const AppBreadcrumbs = ({ items }: AppBreadcrumbsProps) => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        fontSize: '12px',
        fontFamily: 'monospace',
        mb: 4,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (isLast || !item.to) {
          return (
            <span
              className="text-sm font-semibold font-mono"
              key={index}
              color="text.primary"
            >
              {item.label}
            </span>
          )
        }

        return (
          <Link
            key={index}
            component={RouterLink}
            to={item.to}
            color="inherit"
            underline="hover"
          >
            <span className="text-sm font-semibold font-mono text-neutral-400">
              {item.label}
            </span>
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
