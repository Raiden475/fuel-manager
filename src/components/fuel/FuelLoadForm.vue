<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '../../composables/useUserStore'
import { useTruckStore } from '../../composables/useTruckStore'
import { useFuelStore } from '../../composables/useFuelStore'
import type { FuelLoad } from '../../models'

const emit = defineEmits<{
  submit: [data: Omit<FuelLoad, 'id' | 'type' | 'timestamp'>]
  cancel: []
}>()

const { users } = useUserStore()
const { trucks } = useTruckStore()
const { currentLevel, getLastOdometer } = useFuelStore()

const driverId = ref<number | null>(null)
const truckId = ref<number | null>(null)
const odometer = ref<number | null>(null)
const liters = ref<number | null>(null)
const errors = ref<string[]>([])

// Computed: last odometer recorded for the selected truck
const lastOdometer = computed(() => {
  if (!truckId.value) return null
  return getLastOdometer(truckId.value)
})

// Form is valid only when all fields are filled and liters do not exceed tank level
const isFormValid = computed(() =>
  driverId.value !== null &&
  truckId.value !== null &&
  odometer.value !== null &&
  odometer.value > 0 &&
  liters.value !== null &&
  liters.value > 0 &&
  liters.value <= currentLevel.value
)

const handleSubmit = () => {
  errors.value = []

  if (!driverId.value) errors.value.push('Seleccioná un chofer.')
  if (!truckId.value) errors.value.push('Seleccioná una camioneta.')
  if (!odometer.value || odometer.value <= 0) errors.value.push('Ingresá el kilometraje actual.')
  if (odometer.value && lastOdometer.value !== null && odometer.value < lastOdometer.value)
    errors.value.push(`El kilometraje no puede ser menor al último registrado (${lastOdometer.value} km) para esta camioneta.`)
  if (!liters.value || liters.value <= 0) errors.value.push('Ingresá los litros a cargar.')
  if (liters.value && liters.value > currentLevel.value)
    errors.value.push(`No podés cargar más de ${currentLevel.value}L disponibles en el tanque.`)

  if (errors.value.length > 0) return

  emit('submit', {
    driverId: driverId.value!,
    truckId: truckId.value!,
    odometer: odometer.value!,
    liters: liters.value!
  })
}
</script>

<template>
  <div class="space-y-4">
    <!-- Validation errors -->
    <ul
      v-if="errors.length > 0"
      class="bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 text-sm space-y-1"
    >
      <li v-for="error in errors" :key="error">• {{ error }}</li>
    </ul>

    <!-- Driver select -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Chofer</label>
      <select
        v-model="driverId"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option :value="null" disabled>Seleccioná un chofer</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>

    <!-- Truck select -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Camioneta</label>
      <select
        v-model="truckId"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option :value="null" disabled>Seleccioná una camioneta</option>
        <option v-for="truck in trucks" :key="truck.id" :value="truck.id">
          {{ truck.plate }} — {{ truck.brand }} {{ truck.model }}
        </option>
      </select>
    </div>

    <!-- Odometer -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Kilometraje actual</label>
      <input
        v-model.number="odometer"
        type="number"
        min="1"
        placeholder="Ej: 125000"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <!-- Last odometer hint -->
      <p v-if="lastOdometer !== null" class="text-xs text-gray-400 mt-1">
        Último km registrado para esta camioneta: <strong>{{ lastOdometer }} km</strong>
      </p>
    </div>

    <!-- Liters -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Litros a cargar
        <span class="text-gray-400 font-normal ml-1">(disponibles: {{ currentLevel }}L)</span>
      </label>
      <input
        v-model.number="liters"
        type="number"
        min="1"
        :max="currentLevel"
        placeholder="Ej: 40"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Action buttons -->
    <div class="flex gap-3 pt-2">
      <button
        type="button"
        :disabled="!isFormValid"
        class="flex-1 bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        @click="handleSubmit"
      >
        Confirmar carga
      </button>
      <button
        type="button"
        class="flex-1 border border-gray-300 text-gray-700 rounded-md py-2 text-sm font-medium hover:bg-gray-50 transition"
        @click="emit('cancel')"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>
