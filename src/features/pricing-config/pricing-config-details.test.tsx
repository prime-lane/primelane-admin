import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { PricingConfigDetails } from './pricing-config-details'
import * as usePricingConfigModule from './api/use-pricing-config'
import * as useVehicleCategoriesModule from './api/use-vehicle-categories'

const mockNavigate = vi.fn()
const mockUseParams = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => mockUseParams(),
    useNavigate: () => mockNavigate,
  }
})

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

const mockCategoryData = {
  id: 'category-1',
  slug: 'sedan',
  name: 'Sedan',
  description: 'Standard sedan vehicle',
  example_cars: [],
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  one_way_base_price: 5000,
  one_way_per_km: 100,
  one_way_per_min: 50,
  one_way_cancellation_base: 500,
  one_way_cancellation_percentage: 10,
  one_way_cancellation_fee_type: 'percentage',
  one_way_trip_commission_percentage: 15,
  hourly_base_price: 3000,
  hourly_per_km: 80,
  hourly_per_min: 40,
  hourly_cancellation_base: 300,
  hourly_cancellation_percentage: 8,
  hourly_cancellation_fee_type: 'fixed',
  hourly_trip_commission_percentage: 12,
}

describe('PricingConfigDetails', () => {
  const mockUpdateConfig = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.spyOn(useVehicleCategoriesModule, 'useVehicleCategory').mockReturnValue({
      data: mockCategoryData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as any)

    vi.spyOn(usePricingConfigModule, 'useUpdatePricingConfig').mockReturnValue({
      mutate: mockUpdateConfig,
      isPending: false,
      isError: false,
      isSuccess: false,
    } as any)
  })

  describe('can edit one-way config', () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({ id: 'category-1', type: 'one_off' })
    })

    it('loads one-way pricing data', async () => {
      render(<PricingConfigDetails />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText('200000')).toHaveValue(50)
      })
      expect(screen.getByPlaceholderText('1500')).toHaveValue(1)
      expect(screen.getByPlaceholderText('1000')).toHaveValue(0.5)
    })

    it('submits updated one-way pricing', async () => {
      const user = userEvent.setup()
      render(<PricingConfigDetails />)

      const baseFareInput = screen.getByPlaceholderText('200000')
      const perKmInput = screen.getByPlaceholderText('1500')
      const submitButton = screen.getByRole('button', { name: /save changes/i })

      await user.clear(baseFareInput)
      await user.type(baseFareInput, '6000')

      await user.clear(perKmInput)
      await user.type(perKmInput, '120')

      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUpdateConfig).toHaveBeenCalledWith(
          expect.objectContaining({
            base_price: 600000,
            per_km: 12000,
          }),
        )
      })
    })

    it('validates one-way pricing fields', async () => {
      const user = userEvent.setup()
      render(<PricingConfigDetails />)

      const baseFareInput = screen.getByPlaceholderText('200000')
      const submitButton = screen.getByRole('button', { name: /save changes/i })

      await user.clear(baseFareInput)
      await user.type(baseFareInput, '0')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(/base price must be greater than zero/i),
        ).toBeInTheDocument()
      })

      expect(mockUpdateConfig).not.toHaveBeenCalled()
    })
  })

  describe('can edit hourly config', () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({ id: 'category-1', type: 'hourly' })
    })

    it('loads hourly pricing data', async () => {
      render(<PricingConfigDetails />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText('200000')).toHaveValue(30)
      })
      expect(screen.getByPlaceholderText('1500')).toHaveValue(0.8)
      expect(screen.getByPlaceholderText('1000')).toHaveValue(0.4)
    })

    it('submits updated hourly pricing', async () => {
      const user = userEvent.setup()
      render(<PricingConfigDetails />)

      const baseFareInput = screen.getByPlaceholderText('200000')
      const perMinInput = screen.getByPlaceholderText('1000')
      const submitButton = screen.getByRole('button', { name: /save changes/i })

      await user.clear(baseFareInput)
      await user.type(baseFareInput, '3500')

      await user.clear(perMinInput)
      await user.type(perMinInput, '45')

      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUpdateConfig).toHaveBeenCalledWith(
          expect.objectContaining({
            base_price: 350000,
            per_min: 4500,
          }),
        )
      })
    })

    it('validates hourly pricing fields', async () => {
      const user = userEvent.setup()
      render(<PricingConfigDetails />)

      const inputs = screen.getAllByPlaceholderText('10')
      const cancelPercentageInput = inputs[0]
      const submitButton = screen.getByRole('button', { name: /save changes/i })

      await user.clear(cancelPercentageInput)
      await user.type(cancelPercentageInput, '150')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(/percentage cannot exceed 100/i),
        ).toBeInTheDocument()
      })

      expect(mockUpdateConfig).not.toHaveBeenCalled()
    })
  })

  describe('loading and error states', () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({ id: 'category-1', type: 'one_off' })
    })

    it('shows loading state', () => {
      vi.spyOn(
        useVehicleCategoriesModule,
        'useVehicleCategory',
      ).mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
        refetch: vi.fn(),
      } as any)

      render(<PricingConfigDetails />)

      expect(screen.queryByRole('form')).not.toBeInTheDocument()
    })

    it('shows error state', () => {
      vi.spyOn(
        useVehicleCategoriesModule,
        'useVehicleCategory',
      ).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to load' } as Error,
        refetch: vi.fn(),
      } as any)

      render(<PricingConfigDetails />)

      expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
    })
  })
})
