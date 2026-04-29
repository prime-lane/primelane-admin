export const rideTypeLabel: Record<string, string> = {
  one_off: 'Airport Transfer',
  airport_transfer: 'Airport Transfer',
  daily: 'Daily Rental',
  daily_rental: 'Daily Rental',
  fleet: 'Fleet Rental',
  fleet_rental: 'Fleet Rental',
  hourly: 'Hourly',
}

export const formatRideType = (rideType?: string | null): string => {
  if (!rideType) return 'N/A'
  return rideTypeLabel[rideType] ?? rideType
}
