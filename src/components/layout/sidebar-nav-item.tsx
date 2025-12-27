import { NavLink, useLocation } from 'react-router-dom'
import { AltArrowRight } from '@solar-icons/react'
import { cn } from '@/lib/utils'
import { useState, type ElementType, useLayoutEffect } from 'react'

interface SidebarNavItemProps {
  label: string
  icon?: ElementType
  to?: string
  hasSubmenu?: boolean
  onClick?: () => void
  variant?: 'nav' | 'button'
  children?: { label: string; to: string }[]
}

export const SidebarNavItem = ({
  label,
  icon: Icon,
  to,
  hasSubmenu,
  onClick,
  variant = 'nav',
  children,
}: SidebarNavItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Check if any child is active to auto-expand
  useLayoutEffect(() => {
    if (children?.some((child) => location.pathname === child.to)) {
      setIsOpen(true)
    }
  }, [location.pathname, children])

  if (variant === 'button' || (!to && !hasSubmenu)) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        {Icon && <Icon size={22} />}
        <span className="text-sm">{label}</span>
      </button>
    )
  }

  if (hasSubmenu) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center justify-between px-4 py-3 transition-all duration-200 group w-full cursor-pointer',
            isOpen
              ? 'bg-neutral-50 text-neutral-900'
              : 'text-neutral-500 hover:bg-neutral-50',
          )}
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <Icon
                weight={isOpen ? 'Bold' : 'Linear'}
                size={22}
                className={cn(isOpen ? 'text-neutral-900' : 'text-neutral-400')}
              />
            )}
            <span
              className={cn(
                'text-sm',
                isOpen ? 'text-neutral-900 font-medium' : 'text-neutral-400',
              )}
            >
              {label}
            </span>
          </div>
          <AltArrowRight
            size={18}
            className={cn(
              'text-neutral-400 group-hover:text-neutral-600 transition-transform duration-200',
              isOpen && 'rotate-90',
            )}
          />
        </button>
        {isOpen && children && (
          <div className="flex flex-col bg-neutral-50/50">
            {children.map((child) => (
              <NavLink
                key={child.label}
                to={child.to}
                className={({ isActive }) =>
                  cn(
                    'pl-12 pr-4 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'text-white bg-black font-medium'
                      : 'text-neutral-500 hover:text-neutral-900',
                  )
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={to!}
      end={to === '/dashboard'}
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
            {Icon && (
              <Icon
                weight={isActive ? 'Bold' : 'Linear'}
                size={22}
                className={cn(isActive ? 'text-white' : 'text-neutral-400')}
              />
            )}
            <span
              className={cn(
                'text-sm',
                isActive ? 'text-white font-medium' : 'text-neutral-400',
              )}
            >
              {label}
            </span>
          </div>
        </>
      )}
    </NavLink>
  )
}
