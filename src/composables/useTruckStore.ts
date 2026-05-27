import { ref, computed } from 'vue'
import type { Truck } from '../models'

// Reactive state — initial data with 3 trucks as required
const trucks = ref<Truck[]>([
  { id: 1, plate: 'AC123BB', model: 'Ranger', brand: 'Ford' },
  { id: 2, plate: 'BD456CC', model: 'Hilux', brand: 'Toyota' },
  { id: 3, plate: 'CE789DD', model: 'S10', brand: 'Chevrolet' },
])

let nextId = 4

export function useTruckStore() {
  // Computed: total number of registered trucks
  const truckCount = computed(() => trucks.value.length)

  // Find a single truck by its id
  const getTruckById = (id: number): Truck | undefined => trucks.value.find((t) => t.id === id)

  // Add a new truck to the list
  const addTruck = (data: Omit<Truck, 'id'>): void => {
    trucks.value.push({ ...data, id: nextId++ })
  }

  // Replace an existing truck's data
  const updateTruck = (id: number, data: Omit<Truck, 'id'>): void => {
    const index = trucks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      trucks.value[index] = { ...data, id }
    }
  }

  // Remove a truck from the list
  const deleteTruck = (id: number): void => {
    trucks.value = trucks.value.filter((t) => t.id !== id)
  }

  return { trucks, truckCount, getTruckById, addTruck, updateTruck, deleteTruck }
}
