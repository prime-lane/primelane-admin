import type { PaginatedResponse } from '@/services/api-types'

/**
 * we want to transform the api response to a standardized PaginatedResponse
 * 
 * @param data - the raw API response data containing items and pagination
 * @param key - the key where the items array is stored (e.g., 'users', 'drivers')
 * @returns a standardized PaginatedResponse with 'items' array
 */
export const transformPaginatedResponse = <T, K extends string>(
    data: { pagination: PaginatedResponse<T>['pagination'] } & Record<K, T[]>,
    key: K
): PaginatedResponse<T> => {
    return {
        items: data[key] || [],
        pagination: data.pagination
    }
}
