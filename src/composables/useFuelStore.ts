import { ref, computed } from 'vue'
import type { FuelLoad, TankRefill, FuelRecord } from '../models'

// Tank configuration
const TANK_MAX = 500
const currentLevel = ref<number>(320)
const records = ref<FuelRecord[]>([])

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

  return {
    currentLevel,
    TANK_MAX,
    levelPercent,
    isLow,
    isEmpty,
    litersNeededToFill,
    records,
    addFuelLoad,
    refillTank
  }
}
