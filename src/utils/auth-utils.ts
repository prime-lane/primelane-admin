import { path } from '@/app/paths'

export const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')

    window.location.href = path.AUTH.SIGN_IN
}
