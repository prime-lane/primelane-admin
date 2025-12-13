import { NavLink } from 'react-router-dom'
import { AltArrowRight } from '@solar-icons/react'
import { cn } from '@/lib/utils'
import type { ComponentType } from 'react'

interface SidebarNavItemProps {
  label: string
  icon: ComponentType<any>
  to?: string
  hasSubmenu?: boolean
  onClick?: () => void
  variant?: 'nav' | 'button'
}

export const SidebarNavItem = ({
  label,
  icon: Icon,
  to,
  hasSubmenu,
  onClick,
  variant = 'nav',
}: SidebarNavItemProps) => {
  if (variant === 'button' || !to) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
      >
        <Icon size={22} />
        <span className="text-sm">{label}</span>
      </button>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between px-4 py-3 transition-all duration-200 group',
          isActive
            ? 'bg-black text-white hover:bg-neutral-900'
            : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <Icon
              weight={isActive ? 'Bold' : 'Linear'}
              size={22}
              className={cn(isActive ? 'text-white' : 'text-neutral-400')}
            />
            <span className={cn("text-sm", isActive ? "text-white font-medium" : "text-neutral-400")}>{label}</span>
          </div>
          {hasSubmenu && (
            <AltArrowRight
              size={18}
              className="text-neutral-400 group-hover:text-neutral-600"
            />
          )}
        </>
      )}
    </NavLink>
  )
}
