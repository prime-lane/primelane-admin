import { API_ENDPOINTS } from '@/services/api-endpoints'
import { apiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

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
