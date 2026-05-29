// User entity — required by the assignment
export interface User {
  id: number
  name: string
  email: string
}

// Truck entity — vehicles that request fuel
export interface Truck {
  id: number
  plate: string
  model: string
  brand: string
}

// Record created when a truck loads fuel from the tank
export interface FuelLoad {
  id: number
  type: 'load'
  truckId: number
  driverId: number
  odometer: number
  liters: number
  timestamp: string
}

// Record created when a supply truck refills the main tank
export interface TankRefill {
  id: number
  type: 'refill'
  litersAdded: number
  previousLevel: number
  newLevel: number
  timestamp: string
}

// Union type — a record is either a load or a refill
export type FuelRecord = FuelLoad | TankRefill

// User roles in the system
export type UserRole = 'admin' | 'operator'

// Authenticated user session
export interface AuthUser {
  id: number
  name: string
  email: string
  role: UserRole
  password: string
}

// External supply truck that refills the main tank
export interface SupplyTruck {
  driverName: string // external driver — entered manually
  truckPlate: string // supply truck plate
  company: string // transport company name
  remito: string // delivery note number
  litersDelivered: number
  timestamp: string
}
