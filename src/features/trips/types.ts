import type { StatusVariant } from "@/components/ui/status-badge"

export interface Location {
    lat: number
    lng: number
    address: string
}

export interface Rider {
    id: string
    first_name: string
    last_name: string
    image_url: string | null
    email: string | null
    phone_number: string
}

export interface Driver {
    id: string
    first_name: string
    last_name: string
    image_url: string
    email: string
    phone_number: string
}

export interface DriverVehicle {
    id: string
    vin: string
    make: string
    model: string
    year: number
    color: string
    plate_number: string
    type: string
    mileage: string | number
    driver_id: string
    status: string
    category_id: string
    front_image: string
    back_image: string
    side_image: string
    road_worthiness: {
        doc: string
        expiry_date: string
    }
    vehicle_insurance: {
        doc: string
        expiry_date: string
    }
    created_at: string
    updated_at: string
}

export interface RiderPreference {
    id: string
    user_id: string
    occupation: string
    chat_with_driver: boolean
    play_music: boolean
    allow_location_access: boolean
    notify_via_sms: boolean
    notify_via_email: boolean
    notify_via_push_notification: boolean
    allow_marketing_ads: boolean
    is_device_location_on: boolean
    preffered_temperature: string
    dnd: boolean
}

export interface TripDetail {
    id: string
    rider_id: string
    driver_id: string | null
    pickup: Location
    dropoff: Location
    status: StatusVariant
    ride_type: string
    booked_hours: number | null
    is_scheduled: boolean
    scheduled_at: string | null
    vehicle_category?: string
    estimated_fare: string | number | null
    actual_fare: string | number | null
    estimated_distance: string | number | null
    actual_distance: string | number | null
    estimated_duration: string | number | null
    actual_duration: string | number | null
    created_at: string
    requested_at: string
    offered_at: string | null
    accepted_at: string | null
    arrived_pickup_at: string | null
    started_at: string | null
    completed_at: string | null
    cancelled_at: string | null
    updated_at: string
    cancellation_reason: string | null
    canceller_name: string | null
    cancelled_by: string | null
    rating: number | null
    feedback: string | null
    rider?: Rider
    driver?: Driver
    rider_preference?: RiderPreference
    driver_vehicle?: DriverVehicle
    stops?: Location[]
}


export interface Trip {
    id: string
    rider_id: string
    driver_id: string | null
    pickup?: Location
    dropoff?: Location
    status: StatusVariant
    ride_type?: string
    vehicle_category?: string
    estimated_fare: number | null
    actual_fare: number | null
    drivers_earning?: number | null
    commission?: number | null
    cancellation_fee?: number | null
    estimated_distance: number | null
    actual_distance: number | null
    estimated_duration: number | null
    actual_duration: number | null
    created_at: string
    requested_at: string
    rider?: Rider
    driver?: Driver
}



