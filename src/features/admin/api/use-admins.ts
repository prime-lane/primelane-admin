import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { PaginationParams, PaginatedResponse } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import { buildQueryParams } from '@/lib/utils'
import type { Admin, InviteAdminRequest, Role } from '../types'

interface UseAdminsParams extends PaginationParams { }

export const useAdmins = (params?: UseAdminsParams) => {
    return useQuery({
        queryKey: ['admins', params],
        queryFn: async () => {
            const searchParams = buildQueryParams(params)
            searchParams.set('user_type', 'admin')

            const endpoint = `${e.USERS.ROOT}?${searchParams.toString()}`

            const response = await apiClient.get<{ users: Admin[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)

            return transformPaginatedResponse(response.data, 'users')
        },
    })
}

export const useRoles = () => {
    return useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const response = await apiClient.get<{ roles: Role[] }>(e.ROLES)
            return response.data.roles
        }
    })
}

export const useInviteAdmin = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: InviteAdminRequest) => {
            const response = await apiClient.post<{ message: string }>(e.AUTH.ADMIN_INVITE, data)
            return response.data
        },
        onSuccess: (response) => {
            toast.success(response.message || 'Admin invited successfully')
            queryClient.invalidateQueries({ queryKey: ['admins'] })
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to invite admin')
        }
    })
}
