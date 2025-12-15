import { ErrorState, LoadingState } from '@/components/ui/loading-error-states'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  CustomTabPanel as TabPanel,
  a11yProps,
} from '@/components/ui/tab-panel'
import { getInitials } from '@/lib/utils'
import { Avatar, Button, Tab, Tabs, Typography } from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCustomer } from './api/use-customers'
import { useCustomerStats } from './api/use-customer-stats'
import { CustomerOverview } from './components/customer-overview'
import { IdentityDetails } from './components/identity-details'
import { CustomerRatings } from './components/customer-ratings'

export const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: customerResp, isLoading, error } = useCustomer(id!)
  const customer = customerResp?.user
  const { data: stats } = useCustomerStats(id!)

  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const avatarInitials = getInitials(
    `${customer?.first_name}` || '',
    `${customer?.last_name}` || '',
  )
  const customerName = `${customer?.first_name} ${customer?.last_name}`

  if (isLoading) return <LoadingState />
  if (error || !customer)
    return <ErrorState message="Failed to load customer details" />

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Avatar
            src={customer?.image_url || undefined}
            sx={{
              width: 51,
              height: 51,
              bgcolor: 'orange.100',
              color: 'neutral.700',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {avatarInitials}
          </Avatar>
          <div className="flex flex-col gap-[2px]">
            <span className="text-xl text-black font-semibold">
              {customerName}
            </span>
            <span className="text-sm text-neutral-500">{customer.email}</span>
          </div>
          <StatusBadge status={customer.status as any} />
        </div>
        <Button variant="contained" endIcon={<AltArrowDown />}>
          Action
        </Button>
      </div>
      <div className="my-6">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="customer details tabs"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Identity Details" {...a11yProps(1)} />
          <Tab label="Ratings" {...a11yProps(2)} />
          <Tab label="Wallet" {...a11yProps(3)} />
          <Tab label="Identity details" {...a11yProps(4)} />
        </Tabs>
      </div>

      {/* Overview Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <CustomerOverview customer={customer} stats={stats} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <IdentityDetails customer={customer} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <CustomerRatings stats={stats} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <Typography>Wallet Content</Typography>
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Typography>Identity details Content</Typography>
      </TabPanel>
    </>
  )
}
