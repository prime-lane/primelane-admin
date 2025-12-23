import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { ManageUserStatusRequest } from '@/services/api-types'
import type { KycDetails } from '../types'

export const useManageUserStatus = (id?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ action, reason }: ManageUserStatusRequest) => {
            if (!id) throw new Error('User ID is required')
            const response = await apiClient.patch(
                e.USERS.MANAGE_STATUS(id, action),
                { reason },
            )
            return response.data
        },
        onSuccess: () => {
            toast.success('User status updated successfully')
            queryClient.invalidateQueries({ queryKey: ['customer', id] })
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            queryClient.invalidateQueries({ queryKey: ['driver', id] })
            queryClient.invalidateQueries({ queryKey: ['drivers'] })
        },
    })
}

export const useKycDetails = (userId: string) => {
    return useQuery({
        queryKey: ['kyc-details', userId],
        queryFn: async () => {
            const response = await apiClient.get<KycDetails>(e.KYC.BY_ID(userId))
            return response.data
        },
        enabled: !!userId,
    })
}
