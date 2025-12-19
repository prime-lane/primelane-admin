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
const PricingConfig = lazy(() =>
  import('@/features/pricing-config/pricing-config').then((module) => ({
    default: module.PricingConfig,
  })),
)
const Trips = lazy(() =>
  import('@/features/trips/trips').then((module) => ({
    default: module.Trips,
  })),
)
const Finance = lazy(() =>
  import('@/features/finance/finance').then((module) => ({
    default: module.Finance,
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
        path: path.DASHBOARD.PRICING_CONFIG,
        element: (
          <Suspense fallback={<Loading />}>
            <PricingConfig />
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
        path: path.DASHBOARD.FINANCE,
        element: (
          <Suspense fallback={<Loading />}>
            <Finance />
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
