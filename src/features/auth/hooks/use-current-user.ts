import { useQuery } from '@tanstack/react-query'
import type { User } from '@/features/auth/types'
import { logout } from '@/utils/auth-utils'


export const useCurrentUser = () => {
    return useQuery<User | null>({
        queryKey: ['user'],
        queryFn: () => {
            const userStr = localStorage.getItem('user')
            return userStr ? JSON.parse(userStr) : null
        },
        staleTime: Infinity, // User data doesn't go stale until logout
        retry: false,
    })
}

export const useIsAuthenticated = () => {
    const { data: user } = useCurrentUser()
    return !!user && !!localStorage.getItem('access_token')
}


export const useLogout = () => {
    return logout;
}
