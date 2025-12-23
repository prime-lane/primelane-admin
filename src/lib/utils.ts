import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

export const formatDuration = (seconds: string | number | null | undefined) => {
  if (!seconds) return '-'
  const secs = typeof seconds === 'string' ? parseInt(seconds, 10) : seconds
  if (isNaN(secs)) return '-'
  const mins = Math.floor(secs / 60)
  return `${mins} minutes`
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