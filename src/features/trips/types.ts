export interface Location {
    lat: number
    lng: number
    address: string
}
export interface Rider {
    id: string
    first_name: string
    last_name: string
    image_url: string
}
export interface Driver {
    id: string
    first_name: string
    last_name: string
    image_url: string
}
export interface Trip {
    id: string
    rider_id: string
    driver_id: string | null
    pickup_location?: Location
    dropoff_location?: Location
    status: 'pending' | 'accepted' | 'started' | 'completed' | 'cancelled'
    fare: number
    distance: number
    duration: number
    createdAt: string
    updated_at: string
    rider?: Rider
    driver?: Driver
}



