import { FilterButton } from '@/components/ui/data-controls'
import { ErrorState } from '@/components/ui/loading-error-states'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Box, Card, CardContent, Grid, Skeleton } from '@mui/material'
import {
  AltArrowDown,
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
  const { data: dashboardData, isLoading, error } = useDashboardStats()

  if (error) return <ErrorState message="Failed to load dashboard statistics" />

  const stats = dashboardData
    ? [
        {
          icon: <Bill size={24} color="black" />,
          label: 'Total trip revenue',
          value: formatNumber(0),
        },
        {
          icon: <Banknote2 size={24} color="black" />,
          label: 'Total commission',
          value: formatNumber(0),
        },
        {
          icon: <Bill2 size={24} color="black" />,
          label: 'Driver earning',
          value: formatCurrency(0),
        },
        {
          icon: <Rocket size={24} color="black" />,
          label: 'Completed trips',
          value: formatNumber(0),
        },
        {
          icon: <Rocket size={24} color="black" />,
          label: 'Total one-way trips',
          value: formatNumber(0),
        },
        {
          icon: <Rocket size={24} color="black" />,
          label: 'Total hourly trips',
          value: formatNumber(0),
        },
        {
          icon: <UsersGroupTwoRounded size={24} color="black" />,
          label: 'Total Customers',
          value: formatNumber(0),
        },
        {
          icon: <UserCross size={24} color="black" />,
          label: 'Unverified Customers',
          value: formatNumber(0),
        },
        {
          icon: <UserCheck size={24} color="black" />,
          label: 'Verified Customers',
          value: formatNumber(0),
        },
        {
          icon: <Shield size={24} color="black" />,
          label: 'Total Drivers',
          value: formatNumber(0),
        },
        {
          icon: <ShieldCheck size={24} color="black" />,
          label: 'Verified Drivers',
          value: formatNumber(0),
        },
        {
          icon: <ShieldCross size={24} color="black" />,
          label: 'Pending Drivers',
          value: formatNumber(0),
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
        <FilterButton className="space-x-2">
          <span>Filter By</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
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
