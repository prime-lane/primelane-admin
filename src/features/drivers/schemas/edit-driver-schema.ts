import { z } from 'zod'

export const editDriverSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phone_number: z.string().min(1, 'Phone number is required'),
    date_of_birth: z.string().min(1, 'Date of birth is required'),
    residential_address: z.string().min(1, 'Residential address is required'),
    nin: z.string().min(1, 'NIN is required'),
    driver_license: z.string().min(1, 'Driver license is required'),
    vehicle_model: z.string().min(1, 'Vehicle model is required'),
    vehicle_make: z.string().min(1, 'Vehicle make is required'),
    vehicle_color: z.string().min(1, 'Vehicle color is required'),
    vehicle_plate_number: z.string().min(1, 'Vehicle plate number is required'),
    vehicle_vin_chassis: z.string().min(1, 'Vehicle VIN/Chassis is required'),
    vehicle_year: z.string().min(1, 'Vehicle year is required'),
    image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
})

export type EditDriverFormData = z.infer<typeof editDriverSchema>
