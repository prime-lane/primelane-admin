import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Layouts
import { DashboardLayout } from '../components/layout/dashboard-layout'
import { AuthLayout } from '../components/layout/auth-layout'

// Constants
import { PATHS } from './paths'

// Pages (Lazy Loaded)
const Home = lazy(() =>
  import('../features/home/home').then((module) => ({ default: module.Home })),
)
const SignIn = lazy(() =>
  import('../features/auth/sign-in').then((module) => ({
    default: module.SignIn,
  })),
)
const Otp = lazy(() =>
  import('../features/auth/otp').then((module) => ({ default: module.Otp })),
)

const Loading = () => <div>Loading...</div>

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: PATHS.DASHBOARD.ROOT,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: PATHS.AUTH.ROOT,
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.AUTH.SIGN_IN,
        element: (
          <Suspense fallback={<Loading />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: PATHS.AUTH.OTP,
        element: (
          <Suspense fallback={<Loading />}>
            <Otp />
          </Suspense>
        ),
      },
      {
        index: true,
        element: <Navigate to={PATHS.AUTH.SIGN_IN} replace />,
      },
    ],
  },
])
