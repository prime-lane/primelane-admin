import { toast } from 'sonner'
import type { ApiResponse, ApiError } from './api-types'
import { logout } from '@/utils/auth-utils'

const API_BASE_URL = import.meta.env.VITE_PRIMELANE_API_BASE_URL

class ApiClient {
    private baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL
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
                if (response.status === 401 && !window.location.pathname.startsWith('/auth')) {
                    setTimeout(() => {
                        // logout()
                    }, 2000)
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
