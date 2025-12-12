import { Outlet, NavLink } from 'react-router-dom'
import {
  Home,
  UsersGroupRounded,
  UserRounded,
  SettingsMinimalistic,
  BillList,
  Card,
  ShieldUser,
  Logout,
  AltArrowRight,
} from '@solar-icons/react'
import { path } from '../../app/paths'

const NAV_ITEMS = [
  { label: 'Home', icon: Home, to: path.DASHBOARD.ROOT },
  { label: 'Customers', icon: UsersGroupRounded, to: '/dashboard/customers' },
  { label: 'Drivers', icon: UserRounded, to: '/dashboard/drivers' },
  { label: 'Pricing Config.', icon: SettingsMinimalistic, to: '/dashboard/pricing' },
  { label: 'Trips', icon: BillList, to: '/dashboard/trips' },
  { label: 'Finance', icon: Card, to: '/dashboard/finance', hasSubmenu: true },
  { label: 'Admin Mgmt.', icon: ShieldUser, to: '/dashboard/admin', hasSubmenu: true },
]

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans">

      <aside className="w-[280px] bg-white border-r border-neutral-200 flex flex-col flex-shrink-0 fixed h-full z-10 hidden md:flex">

        <div className="h-20 flex items-center px-8">
            <img src="/assets/icon/logo.svg" alt="Primelane Logo" className="h-10" />
        </div>


        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-black text-white hover:bg-neutral-900'
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon weight={isActive ? 'Bold' : 'Linear'} size={22} />
                    <span className="text-[15px] font-medium">{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <AltArrowRight
                      size={18}
                      className="text-neutral-400 group-hover:text-neutral-600"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>


        <div className="p-4 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
            <Logout size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-[280px] flex flex-col">

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
