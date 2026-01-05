import { toast } from 'sonner'
import type { ApiResponse, ApiError } from './api-types'
import { logout } from '@/utils/auth-utils'
import type { AuthResponse, RefreshTokenRequest } from '@/features/auth/types'

const API_BASE_URL = import.meta.env.VITE_PRIMELANE_API_BASE_URL

class ApiClient {
    private baseURL: string
    private isRefreshing = false
    private refreshPromise: Promise<string> | null = null

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    private async refreshToken(): Promise<string> {
        if (this.isRefreshing && this.refreshPromise) {
            return this.refreshPromise
        }

        this.isRefreshing = true
        this.refreshPromise = (async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('user') || '{}').id
                const refreshToken = localStorage.getItem('refresh_token')

                if (!userId || !refreshToken) {
                    throw new Error('No refresh token available')
                }

                const requestBody: RefreshTokenRequest = {
                    user_id: userId,
                    refresh_token: refreshToken,
                }

                const response = await fetch(`${this.baseURL}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                })

                if (!response.ok) {
                    throw new Error('Token refresh failed')
                }

                const result: ApiResponse<AuthResponse> = await response.json()
                const { access_token, refresh_token } = result.data

                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token)

                return access_token
            } catch (error) {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                throw error
            } finally {
                this.isRefreshing = false
                this.refreshPromise = null
            }
        })()

        return this.refreshPromise
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = localStorage.getItem('access_token')

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...((options.headers as Record<string, string>) || {}),
        }

        if (token) {
            headers.Authorization = `Bearer ${token}`
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers,
            })

            const data: ApiResponse<T> = await response.json()

            if (!response.ok) {
                if (response.status === 401 && !window.location.pathname.startsWith('/auth') && endpoint !== '/auth/refresh') {
                    try {
                        const newToken = await this.refreshToken()
                        headers.Authorization = `Bearer ${newToken}`

                        const retryResponse = await fetch(`${this.baseURL}${endpoint}`, {
                            ...options,
                            headers,
                        })

                        const retryData: ApiResponse<T> = await retryResponse.json()

                        if (!retryResponse.ok) {
                            throw new Error(retryData.message || 'Request failed after token refresh')
                        }

                        return retryData
                    } catch (refreshError) {
                        setTimeout(() => {
                            logout()
                        }, 2000)
                        throw refreshError
                    }
                }

                const error = data.data as unknown as ApiError
                const errorMessage = error?.message || data.message || 'An error occurred'

                toast.error(errorMessage)

                throw new Error(errorMessage)
            }

            return data
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Failed to fetch') {
                    toast.error('Network error. Please check your connection.')
                    throw new Error('Network error')
                }
                throw error
            }
            throw new Error('An unexpected error occurred')
        }
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'GET' })
    }

    async post<T>(
        endpoint: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        })
    }

    async put<T>(
        endpoint: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        })
    }

    async patch<T>(
        endpoint: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        })
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' })
    }
}

export const apiClient = new ApiClient(API_BASE_URL)
