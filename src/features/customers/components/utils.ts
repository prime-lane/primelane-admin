import type { Customer } from '../types'

export function getMockCustomers(): Customer[] {
    return Array(10).fill(null).map((_, i) => ({
        id: `customer-${i + 1}`,
        created_at: '2025-02-19',
        first_name: 'Timothy',
        last_name: 'Exodus',
        email: 'customer@example.com',
        phone_number: '08123834250',
        image_url: '',
        status: (i === 0 ? 'pending' : i === 1 ? 'deactivated' : 'active') as any, // Cast to avoid inference issues for now, or just rely on Customer type
        is_email_verified: i > 0,
        nin: '1234567890',
    }))
}
