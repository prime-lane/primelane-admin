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
} from '../types'

// Sign In
export const useSignIn = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: SignInRequest) => {
            const response = await apiClient.post<AuthResponse>(
                e.AUTH.LOGIN.ADMIN,
                data
            )
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

// Sign Up
export const useSignUp = () => {
    return useMutation({
        mutationFn: async (data: SignUpRequest) => {
            const response = await apiClient.post<Record<string, never>>(
                e.AUTH.SIGN_UP,
                data
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
    return useMutation({
        mutationFn: async (data: ForgotPasswordRequest) => {
            const response = await apiClient.post<Record<string, never>>(
                e.AUTH.FORGOT_PASSWORD,
                data
            )
            return response
        },
        onSuccess: (response) => {
            toast.success(response.message || 'OTP sent to your email')
        },
    })
}

// Change Password
export const useChangePassword = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (data: ChangePasswordRequest) => {
            const response = await apiClient.patch<Record<string, never>>(
                e.AUTH.CHANGE_PASSWORD,
                data
            )
            return response
        },
        onSuccess: (response) => {
            toast.success(response.message || 'Password changed successfully')
            navigate(path.AUTH.SIGN_IN)
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
                data
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
export const useConfirmOTP = (action: 'reset-password' | 'change-email' | 'change-phone') => {
    return useMutation({
        mutationFn: async (data: VerifyOTPRequest) => {
            const response = await apiClient.post<Record<string, never>>(
                e.AUTH.CONFIRM_OTP(action),
                data
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
                data
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
                { token }
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
            const response = await apiClient.post<AuthResponse>(
                e.AUTH.GOOGLE.LOGIN,
                { token }
            )
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

