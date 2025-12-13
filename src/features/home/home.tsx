import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import {
  Banknote,
  Bill,
  BillList,
  ClockCircle,
  ClockSquare,
  MapPoint,
  Rocket,
  Routing2,
  ShieldCheck,
  User,
  UserCheck,
  UserCross,
  UsersGroupRounded,
  Wallet,
  WalletMoney
} from '@solar-icons/react'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ color: 'text.secondary', fontSize: '24px' }}>{icon}</Box>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: '#637381',
                fontSize: '0.75rem',
                fontWeight: 400,
                mb: 0.5,
                display: 'block',
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1.5rem',
                lineHeight: 1.2,
                color: '#212B36',
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export const Home = () => {
  const stats = [
    {
      icon: <Bill size={24} />,
      label: 'Total trip revenue',
      value: '₦212,312',
    },
    {
      icon: <Banknote size={24} />,
      label: 'Total commission',
      value: '₦234,234',
    },
    {
      icon: <BillList size={24} />,
      label: 'Driver earning',
      value: '₦1,850,680',
    },
    {
      icon: <Rocket size={24} />,
      label: 'Completed trips',
      value: '12,312',
    },
    {
      icon: <Rocket size={24} />,
      label: 'Total one-way trips',
      value: '212,312',
    },
    {
      icon: <Rocket size={24} />,
      label: 'Total hourly trips',
      value: '1,850,680',
    },
    {
      icon: <UsersGroupRounded size={24} />,
      label: 'Total Customers',
      value: '12,312',
    },
    {
      icon: <UserCross size={24} />,
      label: 'Unverified Customers',
      value: '12,312',
    },
    {
      icon: <UserCheck size={24} />,
      label: 'Verified Customers',
      value: '12,312',
    },
    {
      icon: <User size={24} />,
      label: 'Total drivers',
      value: '300',
    },
    {
      icon: <ShieldCheck size={24} />,
      label: 'Verified drivers',
      value: '300',
    },
    {
      icon: <ClockSquare size={24} />,
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
        <h1 className='text-4xl'>Summary</h1>
        <Button variant="outlined">Filter by</Button>
      </Box>

      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <StatCard icon={stat.icon} label={stat.label} value={stat.value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
