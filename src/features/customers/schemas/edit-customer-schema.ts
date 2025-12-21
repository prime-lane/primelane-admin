import { z } from 'zod'

export const editCustomerSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phone_number: z.string().min(1, 'Phone number is required'),
    residential_address: z.string().min(1, 'Residential address is required'),
    image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
})

export type EditCustomerFormData = z.infer<typeof editCustomerSchema>
