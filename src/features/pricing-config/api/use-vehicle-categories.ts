import { API_ENDPOINTS } from '@/services/api-endpoints'
import { apiClient } from '@/services/api-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { DriverVehicle } from '@/features/trips/types'

export interface VehicleCategoryExample {
    name: string
    img_url: string
    description: string
    no_of_seats: number
}

export interface VehicleCategory {
    id: string
    slug: string
    name: string
    description: string
    example_cars: VehicleCategoryExample[]
    created_at: string
    updated_at: string
}

interface VehicleCategoriesData {
    categories: VehicleCategory[]
    pagination: {
        total_items: number
        total_pages: number
        current_page: number
        limit: number
    }
}

export const useVehicleCategories = () => {
    return useQuery({
        queryKey: ['vehicle-categories'],
        queryFn: async () => {
            const response = await apiClient.get<VehicleCategoriesData>(
                API_ENDPOINTS.VEHICLE_CATEGORIES.ROOT,
            )
            return response.data
        },
    })
}

export const useVehicleCategory = (id: string) => {
    return useQuery({
        queryKey: ['vehicle-category', id],
        queryFn: async () => {
            const response = await apiClient.get<VehicleCategory>(
                API_ENDPOINTS.VEHICLE_CATEGORIES.BY_ID(id),
            )
            return response.data
        },
        enabled: !!id,
    })
}

type VehicleCategoryRequest = {
    category_ids: string[]
}
export const useUpdateVehicleCategory = (id?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: VehicleCategoryRequest) => {
            if (!id) throw new Error('Vehicle Category ID is required')
            const response = await apiClient.patch<{ vehicle: VehicleCategory; message: string }>(
                API_ENDPOINTS.VEHICLE_CATEGORIES.UPDATE_CATEGORY(id),
                data,
            )
            return response.data
        },
        onSuccess: (response) => {
            toast.success(response.message || 'Vehicle Category updated successfully')
            queryClient.invalidateQueries({ queryKey: ['driver-vehicle', id] })
            queryClient.invalidateQueries({ queryKey: ['vehicle-categories'] })
        },
    })
}