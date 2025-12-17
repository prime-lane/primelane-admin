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
import {
  useCustomer,
  useCustomerReviews,
  useCustomerWallet,
  useCustomerTransactions,
} from './api/use-customers'
import { useCustomerStats } from './api/use-customer-stats'
import { CustomerOverview } from './components/customer-overview'
import { IdentityDetails } from './components/identity-details'
import { CustomerRatings } from './components/customer-ratings'
import { CustomerWallet } from './components/customer-wallet'

export const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: customerResp, isLoading, error } = useCustomer(id!)
  const customer = customerResp?.user
  const { data: stats } = useCustomerStats(id!)
  const { data: reviews } = useCustomerReviews(id!)
  const { data: wallet, isLoading: isWalletLoading } = useCustomerWallet(id!)
  const { data: transactions } = useCustomerTransactions({ user_id: id! })

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
        <CustomerRatings stats={stats} reviews={reviews?.items} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <CustomerWallet
          wallet={{
            id: 'wallet-123',
            user_id: 'user-123',
            virtual_bank_account_number: '1234567890',
            virtual_bank_account_name: 'John Doe',
            virtual_bank_code: '057',
            virtual_bank_name: 'GTBank',
            current_balance: 150000,
            last_balance: 145000,
            currency: 'NGN',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }}
          transactions={[
            {
              id: 'tx-1',
              user_id: 'user-123',
              transaction_type: 'CR',
              description: 'Wallet Top up',
              reference: 'ref-1',
              ride_id: null,
              amount: 5000,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: 'Completed',
            },
            {
              id: 'tx-2',
              user_id: 'user-123',
              transaction_type: 'DR',
              description: 'Ride Payment',
              reference: 'ref-2',
              ride_id: 'ride-1',
              amount: 2500,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: 'Completed',
            },
          ]}
          isLoading={false}
        />
        {/* <CustomerWallet
          wallet={wallet}
          transactions={transactions?.items}
          isLoading={isWalletLoading}
        /> */}
      </TabPanel>
    </>
  )
}
