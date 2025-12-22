import { path } from '@/app/paths'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface PricingItem {
  id: string
  label: string
}

const oneWayItems: PricingItem[] = [
  { id: 'business', label: 'Business' },
  { id: 'business_suv', label: 'Business SUV' },
  { id: 'first_class', label: 'First Class' },
]

const hourlyItems: PricingItem[] = [
  { id: 'hourly_business', label: 'Business' },
  { id: 'hourly_business_suv', label: 'Business SUV' },
  { id: 'hourly_first_class', label: 'First Class' },
]

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-base font-semibold text-neutral-800">{title}</h2>
)

const PricingRow = ({ id, label }: { id: string; label: string }) => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between">
      <span className="text-base text-black">{label}</span>
      <Button
        variant="text"
        size="small"
        onClick={() =>
          navigate(path.DASHBOARD.PRICING_CONFIG_DETAILS.replace(':id', id))
        }
        sx={{
          bgcolor: 'neutral.100',
          fontWeight: 500,
          fontSize: '0.875rem',
          textTransform: 'none',
          px: 3,
          py: 1,
          borderRadius: '4px',
          height: '28px',
          '&:hover': {
            bgcolor: 'neutral.200',
          },
        }}
      >
        Edit
      </Button>
    </div>
  )
}

export const PricingConfig = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-neutral-900 mb-12">
        Price Configuration
      </h1>

      <div className="max-w-lg mx-auto space-y-10">
        <section className="space-y-4">
          <SectionHeader title="One-way Configuration" />
          <div className="space-y-4">
            {oneWayItems.map((item) => (
              <PricingRow key={item.id} id={item.id} label={item.label} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeader title="Hourly Configuration" />
          <div className="space-y-4">
            {hourlyItems.map((item) => (
              <PricingRow key={item.id} id={item.id} label={item.label} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
