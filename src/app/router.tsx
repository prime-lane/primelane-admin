import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { DashboardLayout } from '../components/layout/dashboard-layout'
import { AuthLayout } from '../components/layout/auth-layout'
import { ErrorBoundary } from '../components/error-boundary'
import { NotFound } from '../components/not-found'
import { ProtectedRoute } from '../components/protected-route'
import { PublicRoute } from '../components/public-route'

import { path } from './paths'
import { SignIn } from '@/features/auth/sign-in'
import { Invite } from '@/features/auth/invite'
import { Otp } from '@/features/auth/otp'

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

const Loading = () => <div>Loading...</div>

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
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: path.DASHBOARD.CUSTOMERS,
        element: (
          <Suspense fallback={<Loading />}>
            <Customers />
          </Suspense>
        ),
      },
      {
        path: path.DASHBOARD.CUSTOMER_DETAILS,
        element: (
          <Suspense fallback={<Loading />}>
            <CustomerDetails />
          </Suspense>
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
          <Suspense fallback={<Loading />}>
            <Drivers />
          </Suspense>
        ),
      },
      {
        path: path.DASHBOARD.DRIVER_DETAILS,
        element: (
          <Suspense fallback={<Loading />}>
            <DriverDetails />
          </Suspense>
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
          <Suspense fallback={<Loading />}>
            <PricingConfig />
          </Suspense>
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
          <Suspense fallback={<Loading />}>
            <Trips />
          </Suspense>
        ),
      },
      {
        path: path.DASHBOARD.TRIP_DETAILS,
        element: (
          <Suspense fallback={<Loading />}>
            <TripDetails />
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
          <Suspense fallback={<Loading />}>
            <AdminManagement />
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
        path: path.AUTH.SIGN_IN,
        element: (
          <Suspense fallback={<Loading />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: path.AUTH.INVITE,
        element: (
          <Suspense fallback={<Loading />}>
            <Invite />
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
