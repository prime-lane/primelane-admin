import { z } from 'zod'

export const editCustomerSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email cannot be empty" }),
    phone_number: z.string().min(1, 'Phone number is required').optional(),
    nin: z.string().min(1, 'NIN is required'),
    // image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
})

export type EditCustomerFormData = z.infer<typeof editCustomerSchema>

