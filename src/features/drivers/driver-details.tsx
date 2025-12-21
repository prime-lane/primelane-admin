import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { ErrorState, LoadingState } from '@/components/ui/loading-error-states'
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
  Checkbox,
  FormGroup,
  FormControlLabel,
  Tab,
  Tabs,
} from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
  useDriver,
  useDriverStats,
  useDriverReviews,
  useDriverTransactions,
  useDriverWallet,
  useUpdateDriver,
} from './api/use-drivers'
import { DriverOverview } from './components/driver-overview'
import { DriverRatings } from './components/driver-ratings'
import { DriverWallet } from './components/driver-wallet'
import { IdentityDetails } from './components/identity-details'
import { DriverLicense } from './components/driver-license'
import { VehicleDetails } from './components/vehicle-details'

export const DriverDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: driverResp, isLoading, error } = useDriver(id!)
  const driver = driverResp?.user
  const { data: stats } = useDriverStats(id!)
  const { data: reviews } = useDriverReviews(id!)
  const { data: wallet, isLoading: isWalletLoading } = useDriverWallet(id!)
  const { data: transactions } = useDriverTransactions({ user_id: id! })
  const { mutate: updateDriver, isPending: isUpdating } = useUpdateDriver(id)
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const [dialogType, setDialogType] = useState<
    'inactive' | 'reactivate' | 'vehicle_category' | null
  >(null)
  const [reason, setReason] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleCloseMenu()
    navigate(path.DASHBOARD.DRIVER_EDIT.replace(':id', id!))
  }

  const handleStatusChangeClick = (
    type: 'inactive' | 'reactivate' | 'vehicle_category',
  ) => {
    handleCloseMenu()
    setDialogType(type)
    setReason('')
    setSelectedCategories([])
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setReason('')
    setSelectedCategories([])
  }

  const handleConfirmStatusChange = () => {
    if (dialogType === 'vehicle_category') {
      if (selectedCategories.length === 0) {
        toast.error('Please select at least one category')
        return
      }
      // TODO: Implement actual API call when endpoint is ready
      toast.success('Vehicle category updated successfully')
      handleCloseDialog()
      return
    }

    if (!reason) {
      toast.error('Please select a reason')
      return
    }

    const newStatus = dialogType === 'inactive' ? 'inactive' : 'active'

    updateDriver(
      {
        status: newStatus,
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

  const avatarInitials = getInitials(
    `${driver?.first_name}` || '',
    `${driver?.last_name}` || '',
  )
  const driverName = `${driver?.first_name} ${driver?.last_name}`

  if (isLoading) return <LoadingState />
  if (error || !driver)
    return <ErrorState message="Failed to load driver details" />

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: 'Drivers', to: path.DASHBOARD.DRIVERS },
          {
            label: `${driver?.first_name} ${driver?.last_name}`,
            to: path.DASHBOARD.DRIVER_DETAILS.replace(':id', id!),
          },
        ]}
      />
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Avatar
            src={driver?.image_url || undefined}
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
              {driverName}
            </span>
            <span className="text-sm text-neutral-500">{driver.email}</span>
          </div>
          <StatusBadge status={driver.status as any} />
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
          <MenuItem onClick={() => handleStatusChangeClick('vehicle_category')}>
            <span className="text-base text-neutral-500">
              Update vehicle category
            </span>
          </MenuItem>
          {driver.status === 'active' ? (
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
              {dialogType === 'inactive'
                ? 'Deactivate'
                : dialogType === 'reactivate'
                  ? 'Re-activate'
                  : 'Update vehicle category'}
            </span>
          </DialogTitle>
          <DialogContent>
            <div className="space-y-5!">
              <p className="text-neutral-500 text-sm">
                {dialogType === 'inactive'
                  ? 'Please confirm the reason for deactivating this account. The driver will lose access until the account is activated.'
                  : dialogType === 'reactivate' // Added check for reactivate to avoid showing wrong text for vehicle_category
                    ? 'Provide a reason for re-active this account. The driver will regain access immediately.'
                    : 'Provide a reason for active this account. The user will regain access immediately.'}
              </p>

              {dialogType === 'vehicle_category' ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-700">
                    Vehicle Category
                  </p>
                  <FormControl fullWidth>
                    <FormGroup>
                      {['Business', 'Business SUV', 'First Class'].map(
                        (category) => (
                          <FormControlLabel
                            key={category}
                            control={
                              <Checkbox
                                checked={selectedCategories.includes(category)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedCategories((prev) => [
                                      ...prev,
                                      category,
                                    ])
                                  } else {
                                    setSelectedCategories((prev) =>
                                      prev.filter((c) => c !== category),
                                    )
                                  }
                                }}
                              />
                            }
                            label={category}
                          />
                        ),
                      )}
                    </FormGroup>
                  </FormControl>
                </div>
              ) : (
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
              )}
            </div>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={handleCloseDialog} variant="outlined" fullWidth>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmStatusChange}
              variant="outlined"
              fullWidth
              disabled={isUpdating}
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'neutral.800' },
              }}
            >
              {dialogType === 'inactive' ? 'Deactivate' : 'Active'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="my-6">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="driver details tabs"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Identity Details" {...a11yProps(1)} />
          <Tab label="Driver License" {...a11yProps(2)} />
          <Tab label="Vehicle Details" {...a11yProps(3)} />
          <Tab label="Ratings" {...a11yProps(4)} />
          <Tab label="Wallet" {...a11yProps(5)} />
        </Tabs>
      </div>

      <TabPanel value={tabValue} index={0}>
        <DriverOverview driver={driver} stats={stats} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <IdentityDetails driver={driver} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <DriverLicense />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <VehicleDetails />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <DriverRatings stats={stats} reviews={reviews?.items} />
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <DriverWallet
          wallet={wallet}
          transactions={transactions?.items}
          isLoading={isWalletLoading}
        />
      </TabPanel>
    </>
  )
}
