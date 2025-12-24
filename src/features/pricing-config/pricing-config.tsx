import { path } from '@/app/paths'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useVehicleCategories } from './api/use-vehicle-categories'
import { ErrorState } from '@/components/ui/loading-error-states'
import { PricingConfigSkeleton } from './components/skeletons'

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
  const { data: categoriesData, isLoading, error } = useVehicleCategories()

  if (isLoading) return <PricingConfigSkeleton />
  if (error) return <ErrorState message="Failed to load vehicle categories" />
  console.log(categoriesData)

  return (
    <>
      <h1 className="text-2xl font-bold text-neutral-900 mb-12">
        Price Configuration
      </h1>

      <div className="max-w-lg mx-auto space-y-10">
        <section className="space-y-4">
          <SectionHeader title="Vehicle Categories" />
          <div className="space-y-4">
            {categoriesData?.categories?.map((category) => (
              <PricingRow
                key={category.id}
                id={category.id}
                label={category.name}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
