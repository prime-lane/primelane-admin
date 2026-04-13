import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { intervalToDuration } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildQueryParams(params?: object) {
  const searchParams = new URLSearchParams()
  if (!params) return searchParams

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value.toString())
    }
  })
  return searchParams
}

export const getInitials = (firstName: string, lastName: string) => {
  return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase()
}

export function formatCurrency(amount: number | string | null | undefined) {
  if (!amount) return '₦0.00'
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(numericAmount)
}

export const formatDuration = (minutes: string | number | null | undefined) => {
  if (!minutes) return '-'
  const mins = Math.abs(typeof minutes === 'string' ? parseFloat(minutes) : minutes)
  if (isNaN(mins)) return '-'

  const duration = intervalToDuration({ start: 0, end: mins * 60 * 1000 })

  const parts: string[] = []
  if (duration.hours) parts.push(`${duration.hours} hour${duration.hours > 1 ? 's' : ''}`)
  if (duration.minutes) parts.push(`${duration.minutes} minute${duration.minutes > 1 ? 's' : ''}`)
  if (duration.seconds) parts.push(`${duration.seconds} second${duration.seconds > 1 ? 's' : ''}`)

  return parts.length > 0 ? parts.join(' ') : '0 second'
}

export const getCategoryNames = (
  categoryIds?: string[] | null,
  categories?: Array<{ id: string; name: string }>
): string => {
  if (!categoryIds || categoryIds.length === 0) return 'N/A'
  if (!categories) return categoryIds.join(', ')

  const names = categoryIds
    .map((id) => categories.find((cat) => cat.id === id)?.name)
    .filter(Boolean)

  return names.length > 0 ? names.join(', ') : 'N/A'
}

export const formatTitle = (id: string) => {
  return id
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatGender = (initial: 'M' | 'F') => {
  return initial === 'M' ? 'Male' : 'Female'
}
export const formatNumber = (num?: number) => {
  if (num === undefined || num === null) return '0'
  return num.toLocaleString()
}


export const formatImageSrc = (src: string): string => {
  // If it's already a data URL or HTTP URL, return as is
  if (src.startsWith('data:') || src.startsWith('http')) {
    return src
  }
  // Otherwise, assume it's raw base64 and append the data URL prefix
  return `data:image/jpeg;base64,${src}`
}

export const toKobo = (naira: number | string): number => {
  const amount = typeof naira === 'string' ? parseFloat(naira) : naira
  return Math.round(amount * 100)
}

export const fromKobo = (kobo: number | string | null | undefined): number => {
  if (kobo === null || kobo === undefined) return 0
  const amount = typeof kobo === 'string' ? parseFloat(kobo) : kobo
  return amount / 100
}

export const formatDateToLocal = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

