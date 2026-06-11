import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import { path } from '@/app/paths'
import type {
  SignInRequest,
  AuthResponse,
  SignUpRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ChangePasswordRequest,
  VerifyOTPRequest,
  ResendOTPRequest,
  InitializePasswordResetRequest,
  CompletePasswordResetRequest,
  ConfirmOTPResetRequest,
} from '../types'

// Sign In
export const useSignIn = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: SignInRequest) => {
      const response = await apiClient.post<AuthResponse>(
        e.AUTH.LOGIN.ADMIN,
        data,
      )
      return response
    },
    onSuccess: ({ data, message }, payload) => {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      queryClient.setQueryData(['user'], data.user)

      toast.success(message || 'OTP sent')
      navigate(path.AUTH.OTP, { state: { email: payload.identifier } })
    },
  })
}

// Sign Up
export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await apiClient.post<Record<string, never>>(
        e.AUTH.SIGN_UP,
        data,
      )
      return response
    },
    onSuccess: (response) => {
      toast.success(response.message || 'OTP sent successfully')
    },
  })
}

// Refresh Token
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (data: RefreshTokenRequest) => {
      const response = await apiClient.post<AuthResponse>(e.AUTH.REFRESH, data)
      return response.data
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
    },
  })
}

// Forgot Password
export const useForgotPassword = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await apiClient.post<Record<string, never>>(
        e.AUTH.FORGOT_PASSWORD,
        data,
      )
      return response
    },
    onSuccess: (response, variables) => {
      toast.success(response.message || 'OTP sent to your email')
      navigate(path.AUTH.OTP, {
        state: { email: variables.identifier, mode: 'reset-password' },
      })
    },
  })
}

// Change Password (after OTP confirmation in forgot-password flow)
export const useChangePassword = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const response = await apiClient.patch<Record<string, never>>(
        e.AUTH.CHANGE_PASSWORD,
        data,
      )
      return response
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Password changed successfully')
      navigate(path.AUTH.SIGN_IN)
    },
  })
}

// Initialize Password Reset (admin panel: sends reset email to user)
export const useInitializePasswordReset = () => {
  return useMutation({
    mutationFn: async (data: InitializePasswordResetRequest) => {
      const response = await apiClient.post<Record<string, never>>(
        e.AUTH.INITIALIZE_PASSWORD_RESET,
        data,
      )
      return response
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Password reset email sent')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send password reset email')
    },
  })
}

// Complete Password Reset (user lands on reset-password page from email link)
export const useCompletePasswordReset = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: CompletePasswordResetRequest) => {
      const response = await apiClient.post<Record<string, never>>(
        e.AUTH.COMPLETE_PASSWORD_RESET,
        data,
      )
      return response
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Password reset successfully')
      navigate(path.AUTH.SIGN_IN)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reset password')
    },
  })
}

// Confirm OTP for reset-password flow
export const useConfirmOTPForReset = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: ConfirmOTPResetRequest) => {
      const response = await apiClient.post<Record<string, never>>(
        e.AUTH.CONFIRM_OTP('reset-password'),
        data,
      )
      return response
    },
    onSuccess: (_response, variables) => {
      navigate(path.AUTH.CHANGE_PASSWORD, {
        state: { identifier: variables.identifier, otp: variables.otp },
      })
    },
    onError: (error: any) => {
      toast.error(error.message || 'Invalid OTP')
    },
  })
}

// Verify OTP
export const useVerifyOTP = (action: 'verify-phone' | 'login') => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: VerifyOTPRequest) => {
      const response = await apiClient.post<AuthResponse>(
        e.AUTH.VERIFY_OTP(action),
        data,
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))

        queryClient.setQueryData(['user'], data.user)

        toast.success('Verification successful!')
        navigate(path.DASHBOARD.ROOT)
      } else {
        toast.success('Phone verified successfully')
      }
    },
  })
}

// Confirm OTP
export const useConfirmOTP = (
  action: 'reset-password' | 'change-email' | 'change-phone',
) => {
  return useMutation({
    mutationFn: async (data: VerifyOTPRequest) => {
      const response = await apiClient.post<Record<string, never>>(
        e.AUTH.CONFIRM_OTP(action),
        data,
      )
      return response
    },
    onSuccess: (response) => {
      toast.success(response.message || 'OTP confirmed successfully')
    },
  })
}

// Resend OTP
export const useResendOTP = (action: 'verify-phone' | 'login') => {
  return useMutation({
    mutationFn: async (data: ResendOTPRequest) => {
      const response = await apiClient.post<Record<string, never>>(
        e.AUTH.RESEND_OTP(action),
        data,
      )
      return response
    },
    onSuccess: (response) => {
      toast.success(response.message || 'OTP resent successfully')
    },
  })
}

// Google Sign Up
export const useGoogleSignUp = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await apiClient.post<AuthResponse>(
        e.AUTH.GOOGLE.SIGN_UP,
        { token },
      )
      return response.data
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      queryClient.setQueryData(['user'], data.user)

      toast.success('Sign up successful!')
      navigate(path.DASHBOARD.ROOT)
    },
  })
}

// Google Login
export const useGoogleLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await apiClient.post<AuthResponse>(e.AUTH.GOOGLE.LOGIN, {
        token,
      })
      return response.data
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      queryClient.setQueryData(['user'], data.user)

      toast.success('Login successful!')
      navigate(path.DASHBOARD.ROOT)
    },
  })
}

export const useAcceptAdminInvite = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post<any>(
        e.AUTH.ADMIN_INVITE_ACCEPT,
        data,
      )
      return response
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Invite accepted successfully')
      navigate(path.AUTH.SIGN_IN)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to accept invite')
    },
  })
}

export const useVerifyAdminOtp = (
  action: 'verify-phone' | 'login' = 'login',
) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: VerifyOTPRequest) => {
      const response = await apiClient.post<AuthResponse>(
        e.AUTH.ADMIN_OTP(action),
        data,
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))

        queryClient.setQueryData(['user'], data.user)

        toast.success('Verification successful!')
        navigate(path.DASHBOARD.ROOT)
      } else {
        toast.success('Verification successful!')
        navigate(path.DASHBOARD.ROOT)
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to verify OTP')
    },
  })
}
