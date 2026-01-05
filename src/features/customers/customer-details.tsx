import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { AvatarImageDialog } from '@/components/ui/avatar-image-dialog'
import { DetailsSkeleton } from '@/components/ui/details-skeleton'
import { ErrorState } from '@/components/ui/loading-error-states'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  CustomTabPanel as TabPanel,
  a11yProps,
} from '@/components/ui/tab-panel'
import { getInitials } from '@/lib/utils'
import { colors } from '@/theme/colors'
import {
  Avatar,
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
import { useQueryState } from 'nuqs'
import { toast } from 'sonner'
import { useCustomerStats } from './api/use-customer-stats'
import { useCustomer, useCustomerReviews } from './api/use-customers'
import { useManageUserStatus } from '../shared/api/use-users'
import { CustomerOverview } from './components/customer-overview'
import { CustomerRatings } from './components/customer-ratings'
import { IdentityDetails } from './components/identity-details'
import { usePermissionsContext } from '@/hooks/permissions-context'
import { useMemo } from 'react'
import { formatDate } from '@/utils/table-utils'

export const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: customerResp, isLoading, error } = useCustomer(id!)
  const customer = customerResp?.user
  const { data: stats } = useCustomerStats(id!)
  const { data: reviews, isLoading: isReviewsLoading } = useCustomerReviews(id!)
  const { mutate: manageUserStatus, isPending: isUpdating } =
    useManageUserStatus(id)
  const navigate = useNavigate()
  const { hasPermission, permissions } = usePermissionsContext()

  // Menu State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  // Dialog State
  const [dialogType, setDialogType] = useState<
    'inactive' | 'reactivate' | null
  >(null)
  const [reason, setReason] = useState('')

  // Avatar dialog state
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)

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

  const tabConfig = useMemo(
    () => [
      {
        id: 'overview',
        label: 'Overview',
        permission: 'customers:view_details:overview',
      },
      {
        id: 'identity',
        label: 'Identity Details',
        permission: 'customers:view_details:identity_details',
      },
      {
        id: 'ratings',
        label: 'Ratings',
        permission: 'customers:view_details:ratings_reviews',
      },
    ],
    [],
  )

  const visibleTabs = useMemo(
    () => tabConfig.filter((tab) => hasPermission(tab.permission)),
    [tabConfig, permissions],
  )

  const [tabValue, setTabValue] = useQueryState('tab', {
    defaultValue: visibleTabs[0]?.id || 'overview',
    parse: (value) => value,
    serialize: (value) => value,
  })

  const currentTabIndex = visibleTabs.findIndex((tab) => tab.id === tabValue)
  const activeIndex = currentTabIndex === -1 ? 0 : currentTabIndex

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(visibleTabs[newValue]?.id || visibleTabs[0]?.id)
  }

  const customerName = `${customer?.first_name} ${customer?.last_name}`
  const avatarInitials = getInitials(
    `${customer?.first_name}` || '',
    `${customer?.last_name}` || '',
  )

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
          <Avatar
            src={customer?.image_url || undefined}
            onClick={() => customer?.image_url && setIsAvatarDialogOpen(true)}
            sx={{
              width: 51,
              height: 51,
              bgcolor: 'orange.100',
              color: 'neutral.700',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: customer?.image_url ? 'pointer' : 'default',
              '&:hover': customer?.image_url ? { opacity: 0.8 } : {},
            }}
          >
            {avatarInitials}
          </Avatar>
          <div className="flex flex-col gap-[2px]">
            <span className="text-xl text-black font-semibold">
              {customerName}
            </span>
            <span className="text-sm text-neutral-500">Date Joined: {formatDate(customer.created_at)}</span>
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
                Activate Account
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
              {dialogType === 'inactive' ? 'Deactivate' : 'Activate'}
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

        {/* Avatar Image Dialog */}
        <AvatarImageDialog
          open={isAvatarDialogOpen}
          onClose={() => setIsAvatarDialogOpen(false)}
          imageUrl={customer?.image_url || ''}
          altText={customerName}
        />
      </div>
      <div className="my-6">
        <Tabs
          value={activeIndex}
          onChange={handleTabChange}
          aria-label="customer details tabs"
        >
          {visibleTabs.map((tab, index) => (
            <Tab key={tab.id} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </div>

      {visibleTabs.map((tab, index) => (
        <TabPanel key={tab.id} value={activeIndex} index={index}>
          {tab.id === 'overview' && (
            <CustomerOverview customer={customer} stats={stats} />
          )}
          {tab.id === 'identity' && <IdentityDetails customer={customer} />}
          {tab.id === 'ratings' && (
            <CustomerRatings
              stats={stats}
              reviews={reviews?.items}
              isLoading={isReviewsLoading}
            />
          )}
        </TabPanel>
      ))}
    </>
  )
}
