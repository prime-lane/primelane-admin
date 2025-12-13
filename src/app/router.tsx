import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'


import { DashboardLayout } from '../components/layout/dashboard-layout'
import { AuthLayout } from '../components/layout/auth-layout'

import { path } from './paths'

const Home = lazy(() =>
  import('../features/home/home').then((module) => ({ default: module.Home })),
)
const SignIn = lazy(() =>
  import('../features/auth/sign-in').then((module) => ({
    default: module.SignIn,
  })),
)
const Invite = lazy(() =>
  import('../features/auth/invite').then((module) => ({
    default: module.Invite,
  })),
)
const Otp = lazy(() =>
  import('../features/auth/otp').then((module) => ({ default: module.Otp })),
)

const Loading = () => <div>Loading...</div>

export const router = createBrowserRouter([
  {
    path: path.HOME,
    element:<Navigate to={path.AUTH.ROOT} replace />
    // element: (
    //   <Suspense fallback={<Loading />}>
    //     <Home />
    //   </Suspense>
    // ),
  },
  {
    path: path.DASHBOARD.ROOT,
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
    path: path.AUTH.ROOT,
    element: <AuthLayout />,
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
])
