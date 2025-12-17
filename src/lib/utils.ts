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

export function formatCurrency(amount: number | string) {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(numericAmount)
}