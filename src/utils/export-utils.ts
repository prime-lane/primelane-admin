const API_BASE_URL = import.meta.env.VITE_PRIMELANE_API_BASE_URL

export const downloadExport = async (
  endpoint: string,
  filename: string,
): Promise<void> => {
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

    if (!response.ok) {
      throw new Error(`Export failed: ${response.statusText}`)
    }

    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(objectUrl)
  } catch (error) {
    console.error('Export error:', error)
    throw error
  }
}
