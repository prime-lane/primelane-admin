import { format as dateFnsFormat } from 'date-fns'
import { createContext, useContext, type ReactNode } from 'react'
import { formatToLocalTimeZone } from '@/lib/utils'

interface DateFormatContextValue {
  format: (isoString: string | Date | undefined, pattern?: string) => string
}

const DateFormatContext = createContext<DateFormatContextValue | null>(null)

interface DateFormatProviderProps {
  children: ReactNode
}

// send in iso, render in local
export const DateFormatProvider = ({ children }: DateFormatProviderProps) => {
  const fmt = (
    isoString: string | Date | undefined,
    pattern: string = 'yyyy-MM-dd hh:mm:ss a',
  ): string => {
    if (!isoString) return '-'
    try {
      return dateFnsFormat(formatToLocalTimeZone(isoString), pattern)
    } catch {
      return '-'
    }
  }

  return (
    <DateFormatContext.Provider value={{ format: fmt }}>
      {children}
    </DateFormatContext.Provider>
  )
}

export const useDateFormat = (): DateFormatContextValue => {
  const ctx = useContext(DateFormatContext)
  if (!ctx)
    throw new Error('useDateFormat must be used within DateFormatProvider')
  return ctx
}
