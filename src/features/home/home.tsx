import { Box, Card, CardContent, Grid } from '@mui/material'
import { FilterButton } from '@/components/ui/data-controls'
import {
  AltArrowDown,
  Banknote,
  Bill,
  Bill2,
  Rocket,
  Shield,
  ShieldCheck,
  ShieldCross,
  UserCheck,
  UserCross,
  UsersGroupRounded,
} from '@solar-icons/react'

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

export const Home = () => {
  const stats = [
    {
      icon: <Bill size={24} color="black" />,
      label: 'Total trip revenue',
      value: '₦212,312',
    },
    {
      icon: <Banknote size={24} color="black" />,
      label: 'Total commission',
      value: '₦234,234',
    },
    {
      icon: <Bill2 size={24} color="black" />,
      label: 'Driver earning',
      value: '₦1,850,680',
    },
    {
      icon: <Rocket size={24} color="black" />,
      label: 'Completed trips',
      value: '12,312',
    },
    {
      icon: <Rocket size={24} color="black" />,
      label: 'Total one-way trips',
      value: '212,312',
    },
    {
      icon: <Rocket size={24} color="black" />,
      label: 'Total hourly trips',
      value: '1,850,680',
    },
    {
      icon: <UsersGroupRounded size={24} color="black" />,
      label: 'Total Customers',
      value: '12,312',
    },
    {
      icon: <UserCross size={24} color="black" />,
      label: 'Unverified Customers',
      value: '12,312',
    },
    {
      icon: <UserCheck size={24} color="black" />,
      label: 'Verified Customers',
      value: '12,312',
    },
    {
      icon: <Shield size={24} color="black" />,
      label: 'Total drivers',
      value: '300',
    },
    {
      icon: <ShieldCheck size={24} color="black" />,
      label: 'Verified drivers',
      value: '300',
    },
    {
      icon: <ShieldCross size={24} color="black" />,
      label: 'Pending Drivers',
      value: '300',
    },
  ]

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
        <FilterButton className='space-x-2'>
          <span>Filter By</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
      </Box>

      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <StatCard icon={stat.icon} label={stat.label} value={stat.value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
