import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { User } from '../types'
import type { Role } from '@/features/admin/types'

interface UserWithRole extends User {
    role?: Role
}

export const useMe = () => {
    return useQuery<UserWithRole | null>({
        queryKey: ['me'],
        queryFn: async () => {
            const userStr = localStorage.getItem('user')
            if (!userStr) return null

            const user: User = JSON.parse(userStr)

            if (!user.role_id) {
                return {
                    ...user,
                    role_id: '00c3af79-0907-426d-9dea-60c2ece17f65',
                }
            }

            const roleResponse = await apiClient.get<{ role: Role }>(
                e.ROLES.BY_ID(user.role_id),
            )

            return {
                ...user,
                role: roleResponse.data.role,
            }
        },
        staleTime: Infinity,
        retry: false,
    })
}
