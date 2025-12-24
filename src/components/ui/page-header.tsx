import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  action?: ReactNode
}

export const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-medium">{title}</h1>
      {action && <div>{action}</div>}
    </div>
  )
}
