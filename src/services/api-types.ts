export interface ApiResponse<T = unknown> {
    data: T
    success: boolean
    message?: string
}

export interface ApiError {
    message: string
    path?: string
}

export interface PaginationParams {
    page?: number
    limit?: number
    search?: string
}

export interface PaginatedResponse<T> {
    items: T[]
    pagination: {
        total_items: number
        total_pages: number
        current_page: number | string
        limit: number | string
    }
}

export type UserType = 'driver' | 'customer'

export interface ManageUserStatusRequest {
    action: 'activate' | 'deactivate'
    reason: string
}