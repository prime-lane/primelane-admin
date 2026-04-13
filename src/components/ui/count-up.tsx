import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface CountUpProps {
  value: number | string
  className?: string
  decimals?: number
  prefix?: string
  suffix?: string
}

export const CountUp = ({
  value,
  className,
  decimals = 0,
  prefix = '',
  suffix = '',
}: CountUpProps) => {
  const numValue =
    typeof value === 'string'
      ? parseFloat(value.replace(/[^0-9.-]/g, ''))
      : value

  const spring = useSpring(0, {
    stiffness: 75,
    damping: 18,
    mass: 1,
  })

  const display = useTransform(spring, (current: number) => {
    const formatted = current.toFixed(decimals)

    // Add commas for thousands
    const withCommas = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return `${prefix}${withCommas}${suffix}`
  })

  useEffect(() => {
    if (!isNaN(numValue)) {
      spring.set(numValue)
    }
  }, [numValue, spring])

  if (isNaN(numValue)) {
    return <span className={cn(className)}>{value}</span>
  }

  return (
    <motion.span className={cn('tabular-nums tracking-tight', className)}>
      {display}
    </motion.span>
  )
}
