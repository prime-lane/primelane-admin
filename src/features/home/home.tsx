import { FilterMenu } from '@/components/ui/filter-menu'
import { ErrorState } from '@/components/ui/loading-error-states'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Box, Card, CardContent, Grid, Skeleton } from '@mui/material'
import {
  Banknote2,
  Bill,
  Bill2,
  Rocket,
  Shield,
  ShieldCheck,
  ShieldCross,
  UserCheck,
  UserCross,
  UsersGroupTwoRounded,
} from '@solar-icons/react'
import { useQueryState, parseAsString } from 'nuqs'
import { useDashboardStats } from './api/use-dashboard-stats'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <Card sx={{ bgcolor: 'neutral.50' }}>
      <CardContent>
        <div className="flex flex-col gap-[70px]">
          <span>{icon}</span>
          <div className="flex flex-col gap-[2px]">
            <span className="text-sm text-neutral-500">{label}</span>
            <p className="text-xl font-semibold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const SkeletonStatCard = () => {
  return (
    <Card sx={{ bgcolor: 'neutral.50' }}>
      <CardContent>
        <div className="flex flex-col gap-[70px]">
          <Skeleton variant="circular" width={24} height={24} />
          <div className="flex flex-col gap-[2px]">
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="80%" height={28} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const Home = () => {
  const [startDate, setStartDate] = useQueryState('start_date', parseAsString)
  const [endDate, setEndDate] = useQueryState('end_date', parseAsString)

  const filters = {
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  }

  const { data: dashboardData, isLoading, error } = useDashboardStats(filters)

  const handleFilterChange = (key: string, value: any) => {
    if (key === 'date_joined') {
      setStartDate(value.start ? value.start.toISOString() : null)
      setEndDate(value.end ? value.end.toISOString() : null)
    }
  }

  if (error) return <ErrorState message="Failed to load dashboard statistics" />

  const stats = dashboardData
    ? [
        {
          icon: <Bill size={24} color="black" />,
          label: 'Total trip revenue',
          value: formatCurrency(dashboardData.total_trip_revenue),
        },
        {
          icon: <Banknote2 size={24} color="black" />,
          label: 'Total commission',
          value: formatCurrency(dashboardData.total_trip_commission),
        },
        {
          icon: <Bill2 size={24} color="black" />,
          label: 'Driver earning',
          value: formatCurrency(dashboardData.total_trip_driver_earning),
        },
        {
          icon: <Rocket size={24} color="black" />,
          label: 'Completed trips',
          value: formatNumber(dashboardData.total_completed_trip_count),
        },
        {
          icon: <Rocket size={24} color="black" />,
          label: 'Total one-way trips',
          value: formatNumber(dashboardData.total_one_off_trip_count),
        },
        {
          icon: <Rocket size={24} color="black" />,
          label: 'Total hourly trips',
          value: formatNumber(dashboardData.total_hourly_trip_count),
        },
        {
          icon: <UsersGroupTwoRounded size={24} color="black" />,
          label: 'Total Customers',
          value: formatNumber(dashboardData.total_customer_count),
        },
        {
          icon: <UserCross size={24} color="black" />,
          label: 'Unverified Customers',
          value: formatNumber(dashboardData.total_unverified_customer_count),
        },
        {
          icon: <UserCheck size={24} color="black" />,
          label: 'Verified Customers',
          value: formatNumber(dashboardData.total_verified_customer_count),
        },
        {
          icon: <Shield size={24} color="black" />,
          label: 'Total Drivers',
          value: formatNumber(dashboardData.total_driver_count),
        },
        {
          icon: <ShieldCheck size={24} color="black" />,
          label: 'Verified Drivers',
          value: formatNumber(dashboardData.total_verified_driver_count),
        },
        {
          icon: <ShieldCross size={24} color="black" />,
          label: 'Pending Drivers',
          value: formatNumber(dashboardData.total_unverified_driver_count),
        },
      ]
    : []

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <h1 className="text-4xl">Summary</h1>
        <FilterMenu
          options={[
            {
              label: 'Date',
              key: 'date_joined',
              type: 'date-range',
            },
          ]}
          onFilterChange={handleFilterChange}
          activeFilters={{}}
        />
      </Box>

      <Grid container spacing={4}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <SkeletonStatCard />
              </Grid>
            ))
          : stats.map((stat, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <StatCard
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}
