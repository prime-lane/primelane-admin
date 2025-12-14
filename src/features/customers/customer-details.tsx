import { ErrorState, LoadingState } from '@/components/ui/loading-error-states'
import { CustomTabPanel, a11yProps } from '@/components/ui/tab-panel'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCustomer } from './api/use-customers'

export const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: customer, isLoading, error } = useCustomer(id!)
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  if (isLoading) return <LoadingState />
  if (error || !customer)
    return <ErrorState message="Failed to load customer details" />

  return (
    <Box>
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
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
      </Box>

      {/* Overview Tab Content */}
      <CustomTabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 4 }}>
          <p className="text-sm font-semibold">Personal Info</p>
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
        <Typography>Identity Details Content</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <Typography>Ratings Content</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3}>
        <Typography>Wallet Content</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={4}>
        <Typography>Identity details Content</Typography>
      </CustomTabPanel>
    </Box>
  )
}

function AltArrowDown(props: any) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.9201 8.95001L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
