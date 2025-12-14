import { useQuery } from '@tanstack/react-query'
import type { User } from '@/features/auth/types'
import { path } from '@/app/paths'

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
    return () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        window.location.href = path.AUTH.SIGN_IN
    }
}
