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
            return response.data?.roles
        }
    })
}

export const usePaginatedRoles = (params?: PaginationParams) => {
    return useQuery({
        queryKey: ['roles-paginated', params],
        queryFn: async () => {
            const searchParams = buildQueryParams(params)
            const endpoint = `${e.ROLES}?${searchParams.toString()}`
            const response = await apiClient.get<{ roles: Role[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)
            return transformPaginatedResponse(response.data, 'roles')
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
export const useCreateRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { name: string; permissions: string[] }) => {
            const response = await apiClient.post<{ message: string }>(e.ROLES, data)
            return response.data
        },
        onSuccess: (response) => {
            toast.success(response.message || 'Role created successfully')
            queryClient.invalidateQueries({ queryKey: ['roles-paginated'] })
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create role')
        }
    })
}

export const useUpdateRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: { name: string; permissions: string[] } }) => {
            const response = await apiClient.put<{ message: string }>(`${e.ROLES}/${id}`, data)
            return response.data
        },
        onSuccess: (response) => {
            toast.success(response.message || 'Role updated successfully')
            queryClient.invalidateQueries({ queryKey: ['roles-paginated'] })
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update role')
        }
    })
}

export const useDeleteRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await apiClient.delete<{ message: string }>(`${e.ROLES}/${id}`)
            return response.data
        },
        onSuccess: (response) => {
            toast.success(response.message || 'Role deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['roles-paginated'] })
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete role')
        }
    })
}
