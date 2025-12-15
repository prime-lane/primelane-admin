import { Avatar } from '@mui/material'
import { ArrowRightUp } from '@solar-icons/react'
import type { Customer } from '../types'
import { StatsCard } from './stats-card'

interface IdentityDetailsProps {
  customer: Customer
}

const InfoRow = ({
  index,
  label,
  value,
  isImage = false,
}: {
  index: number
  label: string
  value: string | React.ReactNode
  isImage?: boolean
}) => {
  return (
    <div className="flex items-center py-3 gap-4">
      <span className="text-neutral-500 text-sm">{index}.</span>
      <span className="text-neutral-500 text-sm w-40">{label}</span>
      <span className="text-neutral-500 text-sm font-semibold">-</span>
      {isImage && typeof value === 'string' ? (
        <div className="flex items-end">
          <Avatar src={value} sx={{ width: 20, height: 20 }} />
          <ArrowRightUp size={11} className="text-neutral-500 cursor-pointer" />
        </div>
      ) : (
        <span className="text-neutral-900 text-sm font-semibold">
          {value as React.ReactNode}
        </span>
      )}
    </div>
  )
}


export const IdentityDetails = ({ customer }: IdentityDetailsProps) => {
  // Mock data for fields not yet in API
  const mockData = {
    nin: '34309604',
    faceMatchScore: '20%',
    middleName: 'Exodus',
    gender: 'Male',
    dob: '1982-01-01',
    employmentStatus: 'unemployment',
    maritalStatus: 'Single',
  }

  return (
    <div className="space-y-8">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard label="NIN" value={mockData.nin} />
        <StatsCard label="ID Verification Status" status="pending" />
        <StatsCard label="Face Match Score" value={mockData.faceMatchScore} />
      </div>

      {/* Details List Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Result from NIN</h3>
        <div className="flex flex-col gap-1">
          <InfoRow index={1} label="First Name" value={customer.first_name} />
          <InfoRow index={2} label="Last Name" value={customer.last_name} />
          <InfoRow index={3} label="Middle Name" value={mockData.middleName} />
          <InfoRow index={4} label="Gender" value={mockData.gender} />
          <InfoRow
            index={5}
            label="Photo"
            value={customer.image_url || ''}
            isImage
          />
          <InfoRow index={6} label="Date of Birth" value={mockData.dob} />
          <InfoRow index={7} label="Email Address" value={customer.email} />
          <InfoRow
            index={8}
            label="Phone Number"
            value={customer.phone_number}
          />
          <InfoRow
            index={9}
            label="Employment Status"
            value={mockData.employmentStatus}
          />
          <InfoRow
            index={10}
            label="Marital Status"
            value={mockData.maritalStatus}
          />
        </div>
      </div>
    </div>
  )
}
