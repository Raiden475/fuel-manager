import { ref, computed, watch } from 'vue'
import type { FuelLoad, TankRefill, FuelRecord, SupplyTruck } from '../models'

// Tank configuration
const TANK_MAX = 500

// Load persisted data from localStorage or use defaults
const savedLevel = localStorage.getItem('fuel_tank_level')
const savedRecords = localStorage.getItem('fuel_records')
const savedSupplyHistory = localStorage.getItem('fuel_supply_history') // Optional: For persisting supply history

const currentLevel = ref<number>(savedLevel ? Number(savedLevel) : 320)
const records = ref<FuelRecord[]>(savedRecords ? JSON.parse(savedRecords) : [])

// Supply truck refill history (Declared globally matching other state variables)
const supplyHistory = ref<SupplyTruck[]>(savedSupplyHistory ? JSON.parse(savedSupplyHistory) : [])

export function useFuelStore() {
  // Computed: percentage of tank filled
  const levelPercent = computed(() =>
    Math.round((currentLevel.value / TANK_MAX) * 100)
  )

  // Computed: true when tank is critically low
  const isLow = computed(() => currentLevel.value < 50)

  // Computed: true when tank is completely empty
  const isEmpty = computed(() => currentLevel.value <= 0)

  // Computed: liters needed to reach full capacity
  const litersNeededToFill = computed(() => TANK_MAX - currentLevel.value)

  // Persist tank level to localStorage on every change
  watch(currentLevel, (val) => {
    localStorage.setItem('fuel_tank_level', String(val))
  })

  // Persist records to localStorage on every change
  watch(records, (val) => {
    localStorage.setItem('fuel_records', JSON.stringify(val))
  }, { deep: true })

  // Persist supply history to localStorage on every change
  watch(supplyHistory, (val) => {
    localStorage.setItem('fuel_supply_history', JSON.stringify(val))
  }, { deep: true })

  // Add a fuel load — returns false if tank empty or not enough fuel
  const addFuelLoad = (data: Omit<FuelLoad, 'id' | 'type' | 'timestamp'>): boolean => {
    if (isEmpty.value || data.liters > currentLevel.value) return false
    currentLevel.value -= data.liters
    records.value.unshift({
      ...data,
      id: Date.now(),
      type: 'load',
      timestamp: new Date().toISOString()
    })
    return true
  }

  // Refill tank — returns actual liters added (capped at available space)
  const refillTank = (litersAvailable: number): number => {
    const prev = currentLevel.value
    const added = Math.min(litersAvailable, litersNeededToFill.value)
    currentLevel.value += added
    records.value.unshift({
      id: Date.now(),
      type: 'refill',
      litersAdded: added,
      previousLevel: prev,
      newLevel: currentLevel.value,
      timestamp: new Date().toISOString()
    })
    return added
  }

  // Get the last recorded odometer for a specific truck
  const getLastOdometer = (truckId: number): number | null => {
    const lastLoad = records.value.find(
      (r) => r.type === 'load' && (r as FuelLoad).truckId === truckId
    ) as FuelLoad | undefined
    return lastLoad ? lastLoad.odometer : null
  }

  // Add a supply truck refill with external driver details
  const addSupplyRefill = (data: Omit<SupplyTruck, 'timestamp'>): number => {
    const prev = currentLevel.value
    const added = Math.min(data.litersDelivered, litersNeededToFill.value)
    currentLevel.value += added

    supplyHistory.value.unshift({
      ...data,
      litersDelivered: added,
      timestamp: new Date().toISOString()
    })

    records.value.unshift({
      id: Date.now(),
      type: 'refill',
      litersAdded: added,
      previousLevel: prev,
      newLevel: currentLevel.value,
      timestamp: new Date().toISOString()
    })
    return added
  }

  return {
    currentLevel,
    TANK_MAX,
    levelPercent,
    isLow,
    isEmpty,
    litersNeededToFill,
    records,
    addFuelLoad,
    refillTank,
    getLastOdometer,
    supplyHistory,
    addSupplyRefill
  }
}
