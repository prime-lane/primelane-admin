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
    user_type?: 'customer' | 'driver'
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
