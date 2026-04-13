import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { ErrorBoundary } from '../components/error-boundary'
import { AuthLayout } from '../components/layout/auth-layout'
import { DashboardLayout } from '../components/layout/dashboard-layout'
import { NotFound } from '../components/not-found'
import { ProtectedRoute } from '../components/protected-route'
import { PublicRoute } from '../components/public-route'
import { PermissionsProvider } from '../hooks/permissions-context'

import { Invite } from '@/features/auth/invite'
import { Otp } from '@/features/auth/otp'
import { SignIn } from '@/features/auth/sign-in'
import { ForgotPassword } from '@/features/auth/forgot-password'
import { path } from './paths'
import { RoutePermissionGate } from '@/components/ui/route-permission-gate'

const Home = lazy(() =>
  import('@/features/home/home').then((module) => ({ default: module.Home })),
)
const Customers = lazy(() =>
  import('@/features/customers/customers').then((module) => ({
    default: module.Customers,
  })),
)
const CustomerDetails = lazy(() =>
  import('@/features/customers/customer-details').then((module) => ({
    default: module.CustomerDetails,
  })),
)
const EditCustomer = lazy(() =>
  import('@/features/customers/edit-customer').then((module) => ({
    default: module.EditCustomer,
  })),
)
const Drivers = lazy(() =>
  import('@/features/drivers/drivers').then((module) => ({
    default: module.Drivers,
  })),
)
const DriverDetails = lazy(() =>
  import('@/features/drivers/driver-details').then((module) => ({
    default: module.DriverDetails,
  })),
)
const EditDriver = lazy(() =>
  import('@/features/drivers/edit-driver').then((module) => ({
    default: module.EditDriver,
  })),
)
const PricingConfig = lazy(() =>
  import('@/features/pricing-config/pricing-config').then((module) => ({
    default: module.PricingConfig,
  })),
)
const PricingConfigDetails = lazy(() =>
  import('@/features/pricing-config/pricing-config-details').then((module) => ({
    default: module.PricingConfigDetails,
  })),
)
const Trips = lazy(() =>
  import('@/features/trips/trips').then((module) => ({
    default: module.Trips,
  })),
)
const TripDetails = lazy(() =>
  import('@/features/trips/trip-details').then((module) => ({
    default: module.TripDetails,
  })),
)
const Reviews = lazy(() =>
  import('@/features/shared/reviews').then((module) => ({
    default: module.Reviews,
  })),
)
// const Commission = lazy(() =>
//   import('@/features/finance/commission').then((module) => ({
//     default: module.Commission,
//   })),
// )
// const DriverSettlements = lazy(() =>
//   import('@/features/finance/driver-settlements').then((module) => ({
//     default: module.DriverSettlements,
//   })),
// )
// const DriverWallet = lazy(() =>
//   import('@/features/finance/driver-wallet').then((module) => ({
//     default: module.DriverWallet,
//   })),
// )
// const CustomerWallet = lazy(() =>
//   import('@/features/finance/customer-wallet').then((module) => ({
//     default: module.CustomerWallet,
//   })),
// )
const Refund = lazy(() =>
  import('@/features/finance/refund').then((module) => ({
    default: module.Refund,
  })),
)
const AdminManagement = lazy(() =>
  import('@/features/admin/admin-management').then((module) => ({
    default: module.AdminManagement,
  })),
)
const RolesManagement = lazy(() =>
  import('@/features/admin/roles/roles-management').then((module) => ({
    default: module.RolesManagement,
  })),
)

const Loading = () => null

export const router = createBrowserRouter([
  {
    path: path.HOME,
    element: <Navigate to={path.AUTH.ROOT} replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: path.DASHBOARD.ROOT,
    element: (
      <ProtectedRoute>
        <PermissionsProvider>
          <DashboardLayout />
        </PermissionsProvider>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <RoutePermissionGate permission="dashboard:view">
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.CUSTOMERS,
        element: (
          <RoutePermissionGate permission="customers:view">
            <Suspense fallback={<Loading />}>
              <Customers />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.CUSTOMER_DETAILS,
        element: (
          <RoutePermissionGate permission="customers:view_details">
            <Suspense fallback={<Loading />}>
              <CustomerDetails />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.CUSTOMER_EDIT,
        element: (
          <Suspense fallback={<Loading />}>
            <EditCustomer />
          </Suspense>
        ),
      },
      {
        path: path.DASHBOARD.DRIVERS,
        element: (
          <RoutePermissionGate permission="drivers:view">
            <Suspense fallback={<Loading />}>
              <Drivers />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.DRIVER_DETAILS,
        element: (
          <RoutePermissionGate permission="drivers:view_details">
            <Suspense fallback={<Loading />}>
              <DriverDetails />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.DRIVER_EDIT,
        element: (
          <Suspense fallback={<Loading />}>
            <EditDriver />
          </Suspense>
        ),
      },
      {
        path: path.DASHBOARD.PRICING_CONFIG,
        element: (
          <RoutePermissionGate permission="price_configurations:view">
            <Suspense fallback={<Loading />}>
              <PricingConfig />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.PRICING_CONFIG_DETAILS,
        element: (
          <Suspense fallback={<Loading />}>
            <PricingConfigDetails />
          </Suspense>
        ),
      },
      {
        path: path.DASHBOARD.TRIPS,
        element: (
          <RoutePermissionGate permission="trips:view">
            <Suspense fallback={<Loading />}>
              <Trips />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.TRIP_DETAILS,
        element: (
          <RoutePermissionGate permission="trips:view_details">
            <Suspense fallback={<Loading />}>
              <TripDetails />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.REVIEWS,
        element: (
          <Suspense fallback={<Loading />}>
            <Reviews />
          </Suspense>
        ),
      },
      // {
      //   path: path.DASHBOARD.FINANCE.ROOT,
      //   element: <Navigate to={path.DASHBOARD.FINANCE.COMMISSION} replace />,
      // },
      // {
      //   path: path.DASHBOARD.FINANCE.COMMISSION,
      //   element: (
      //     <Suspense fallback={<Loading />}>
      //       <Commission />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: path.DASHBOARD.FINANCE.DRIVER_SETTLEMENTS,
      //   element: (
      //     <Suspense fallback={<Loading />}>
      //       <DriverSettlements />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: path.DASHBOARD.FINANCE.DRIVER_WALLET,
      //   element: (
      //     <Suspense fallback={<Loading />}>
      //       <DriverWallet />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: path.DASHBOARD.FINANCE.CUSTOMER_WALLET,
      //   element: (
      //     <Suspense fallback={<Loading />}>
      //       <CustomerWallet />
      //     </Suspense>
      //   ),
      // },
      {
        path: path.DASHBOARD.FINANCE.REFUND,
        element: (
          <Suspense fallback={<Loading />}>
            <Refund />
          </Suspense>
        ),
      },
      {
        path: path.DASHBOARD.ADMIN_MANAGEMENT,
        element: (
          <RoutePermissionGate permission="admin_management:view">
            <Suspense fallback={<Loading />}>
              <AdminManagement />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
      {
        path: path.DASHBOARD.ROLES_PERMISSIONS,
        element: (
          <RoutePermissionGate permission="rbac:view">
            <Suspense fallback={<Loading />}>
              <RolesManagement />
            </Suspense>
          </RoutePermissionGate>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: path.AUTH.INVITE,
        element: (
          <Suspense fallback={<Loading />}>
            <Invite />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: path.AUTH.ROOT,
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: path.AUTH.FORGOT_PASSWORD,
        element: (
          <Suspense fallback={<Loading />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: path.AUTH.SIGN_IN,
        element: (
          <Suspense fallback={<Loading />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: path.AUTH.OTP,
        element: (
          <Suspense fallback={<Loading />}>
            <Otp />
          </Suspense>
        ),
      },
      {
        index: true,
        element: <Navigate to={path.AUTH.SIGN_IN} replace />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
