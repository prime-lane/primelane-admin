import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { PaginationParams, PaginatedResponse } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import { buildQueryParams } from '@/lib/utils'
import type { Transaction } from '@/features/customers/types'

interface UseTransactionsParams extends PaginationParams {
  search?: string
  transaction_type?: 'CR' | 'DR'
  start_date?: string
  end_date?: string
  is_refund?: 'true'
  has_provider?: 'true'
  customer_wallet?: 'true'
}

export const useTransactions = (params?: UseTransactionsParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async () => {
      const searchParams = buildQueryParams(params)
      const endpoint = `${e.TRANSACTIONS.MY_TRANSACTIONS}?${searchParams.toString()}`
      const response = await apiClient.get<{
        transactions: Transaction[]
        pagination: PaginatedResponse<unknown>['pagination']
      }>(endpoint)
      return transformPaginatedResponse(response.data, 'transactions')
    },
  })
}
