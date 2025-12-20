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
    riderId: string
    driverId: string | null
    pickup?: Location
    dropoff?: Location
    status: 'PENDING' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED'
    tripType?: string
    vehicleCategory?: string
    estimatedFare: number | null
    actualFare: number | null
    driversEarning?: number
    commission?: number
    calculationFee?: number
    estimatedDistance: number | null
    actualDistance: number | null
    estimatedDuration: number | null
    actualDuration: number | null
    createdAt: string
    requestedAt: string
    offeredAt: string | null
    acceptedAt: string | null
    startedAt: string | null
    completedAt: string | null
    cancelledAt: string | null
    updatedAt: string
    cancellationReason: string | null
    cancelledBy: string | null
    rating: number | null
    feedback: string | null
    metadata: any | null
    rider?: Rider
    driver?: Driver
}



