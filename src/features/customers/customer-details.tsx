import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { DetailsSkeleton } from '@/components/ui/details-skeleton'
import { ErrorState } from '@/components/ui/loading-error-states'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  CustomTabPanel as TabPanel,
  a11yProps,
} from '@/components/ui/tab-panel'
import { colors } from '@/theme/colors'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useCustomerStats } from './api/use-customer-stats'
import { useCustomer, useCustomerReviews } from './api/use-customers'
import { useManageUserStatus } from '../shared/api/use-users'
import { CustomerOverview } from './components/customer-overview'
import { CustomerRatings } from './components/customer-ratings'
import { IdentityDetails } from './components/identity-details'

export const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: customerResp, isLoading, error } = useCustomer(id!)
  const customer = customerResp?.user
  const { data: stats } = useCustomerStats(id!)
  const { data: reviews, isLoading: isReviewsLoading } = useCustomerReviews(id!)
  const { mutate: manageUserStatus, isPending: isUpdating } =
    useManageUserStatus(id)
  const navigate = useNavigate()

  // Menu State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  // Dialog State
  const [dialogType, setDialogType] = useState<
    'inactive' | 'reactivate' | null
  >(null)
  const [reason, setReason] = useState('')

  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleCloseMenu()
    navigate(path.DASHBOARD.CUSTOMER_EDIT.replace(':id', id!))
  }

  const handleStatusChangeClick = (type: 'inactive' | 'reactivate') => {
    handleCloseMenu()
    setDialogType(type)
    setReason('')
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setReason('')
  }

  const handleConfirmStatusChange = () => {
    if (!reason) {
      toast.error('Please select a reason')
      return
    }

    const action = dialogType === 'inactive' ? 'deactivate' : 'activate'

    manageUserStatus(
      {
        action,
        reason,
      },
      {
        onSuccess: () => {
          handleCloseDialog()
        },
        onError: () => {
          toast.error('Failed to update status')
        },
      },
    )
  }

  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const customerName = `${customer?.first_name} ${customer?.last_name}`

  if (isLoading) return <DetailsSkeleton />
  if (error || !customer)
    return <ErrorState message="Failed to load customer details" />

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: 'Customers', to: path.DASHBOARD.CUSTOMERS },
          {
            label: `${customer?.first_name} ${customer?.last_name}`,
            to: path.DASHBOARD.CUSTOMER_DETAILS.replace(':id', id!),
          },
        ]}
      />
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-[2px]">
            <span className="text-xl text-black font-semibold">
              {customerName}
            </span>
            <span className="text-sm text-neutral-500">{customer.email}</span>
          </div>
          <StatusBadge status={customer.status as any} />
        </div>

        <Button
          variant="contained"
          endIcon={<AltArrowDown />}
          onClick={handleActionClick}
        >
          Action
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEdit}>
            <span className="text-base text-neutral-500">Edit Account</span>
          </MenuItem>
          {customer.status === 'active' ? (
            <MenuItem
              onClick={() => handleStatusChangeClick('inactive')}
              sx={{ color: colors.green[50] }}
            >
              <span className="text-base text-red-500">Deactivate Account</span>
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => handleStatusChangeClick('reactivate')}
              sx={{ color: 'success.main' }}
            >
              <span className="text-base text-green-500">
                Re-activate Account
              </span>
            </MenuItem>
          )}
        </Menu>

        <Dialog
          open={!!dialogType}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="font-sans!">
            <span className="text-2xl font-medium">
              {dialogType === 'inactive' ? 'Deactivate' : 'Re-activate'}
            </span>
          </DialogTitle>
          <DialogContent>
            <div className="space-y-5!">
              <p className="text-neutral-500 text-sm">
                {dialogType === 'inactive'
                  ? 'Please confirm the reason for deactivating this account. The user will lose access until the account is activated.'
                  : 'Provide a reason for re-active this account. The user will regain access immediately.'}
              </p>
              <FormControl fullWidth>
                <InputLabel id="reason-label">
                  {dialogType === 'inactive'
                    ? 'Reason for Deactivation'
                    : 'Reason for activation'}
                </InputLabel>
                <Select
                  labelId="reason-label"
                  value={reason}
                  label={
                    dialogType === 'inactive'
                      ? 'Reason for Deactivation'
                      : 'Reason for activation'
                  }
                  fullWidth
                  onChange={(e) => setReason(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    Select a reason
                  </MenuItem>
                  {dialogType === 'inactive'
                    ? [
                        <MenuItem key="1" value="Policy Violation">
                          Policy Violation
                        </MenuItem>,
                        <MenuItem key="2" value="Fraud suspicion">
                          Fraud suspicion
                        </MenuItem>,
                        <MenuItem key="3" value="Incomplete document">
                          Incomplete document
                        </MenuItem>,
                      ]
                    : [
                        <MenuItem key="1" value="Issue resolved">
                          Issue resolved
                        </MenuItem>,
                        <MenuItem key="2" value="Documents verified">
                          Documents verified
                        </MenuItem>,
                        <MenuItem key="3" value="Account review completed">
                          Account review completed
                        </MenuItem>,
                      ]}
                </Select>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={handleCloseDialog} variant="outlined" fullWidth>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmStatusChange}
              variant="contained"
              fullWidth
              disabled={isUpdating}
            >
              {dialogType === 'inactive' ? 'Deactivate' : 'Activate'}
            </Button>
          </DialogActions>
        </Dialog>
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
        <CustomerRatings
          stats={stats}
          reviews={reviews?.items}
          isLoading={isReviewsLoading}
        />
      </TabPanel>
    </>
  )
}
