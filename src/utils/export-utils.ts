import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_PRIMELANE_API_BASE_URL

export const downloadExport = async (endpoint: string): Promise<void> => {
  const token = localStorage.getItem('access_token')

  const separator = endpoint.includes('?') ? '&' : '?'
  const url = `${API_BASE_URL}${endpoint}${separator}export=true`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error(data?.message || 'Export failed')
      return
    }

    toast.success(data?.message || 'Report has been sent to your email')
  } catch {
    toast.error('Export failed. Please try again.')
  }
}
