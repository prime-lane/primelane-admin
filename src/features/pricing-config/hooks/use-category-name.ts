import { useVehicleCategories } from '@/features/pricing-config/api/use-vehicle-categories'

export const useCategoryName = () => {
  const { data: categoriesData } = useVehicleCategories()

  const getCategoryName = (categoryId?: string | null): string => {
    if (!categoryId) return 'N/A'
    if (!categoriesData?.categories) return categoryId

    const category = categoriesData.categories.find(
      (cat) => cat.id === categoryId,
    )
    return category?.name || categoryId
  }

  return { getCategoryName }
}
