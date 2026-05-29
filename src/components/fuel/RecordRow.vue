<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../../composables/useUserStore'
import { useTruckStore } from '../../composables/useTruckStore'
import type { FuelRecord, FuelLoad } from '../../models'

const props = defineProps<{
  record: FuelRecord
}>()

const { getUserById } = useUserStore()
const { getTruckById } = useTruckStore()

// Get driver and truck names only for fuel load records
const driverName = computed(() => {
  if (props.record.type !== 'load') return null
  return getUserById((props.record as FuelLoad).driverId)?.name ?? 'Desconocido'
})

const truckPlate = computed(() => {
  if (props.record.type !== 'load') return null
  return getTruckById((props.record as FuelLoad).truckId)?.plate ?? 'Desconocida'
})

// Get odometer only for load records
const odometer = computed(() => {
  if (props.record.type !== 'load') return null
  return (props.record as FuelLoad).odometer
})

// Format timestamp to local date string
const formattedDate = computed(() =>
  new Date(props.record.timestamp).toLocaleString()
)
</script>

<template>
  <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
    <!-- Type badge -->
    <td class="px-4 py-3">
      <span
        class="inline-block px-2 py-1 rounded text-xs font-semibold"
        :class="record.type === 'load'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-green-100 text-green-700'"
      >
        {{ record.type === 'load' ? 'CARGA' : 'RECARGA' }}
      </span>
    </td>

    <!-- Liters -->
    <td class="px-4 py-3 text-sm text-gray-700">
      {{ record.type === 'load' ? (record as FuelLoad).liters : (record as any).litersAdded }}L
    </td>

    <!-- Driver and truck -->
    <td class="px-4 py-3 text-sm text-gray-700">
      <template v-if="record.type === 'load'">
        <span>{{ driverName }}</span>
        <span class="text-gray-400 mx-1">·</span>
        <span>{{ truckPlate }}</span>
      </template>
      <span v-else class="text-gray-400">—</span>
    </td>

    <!-- Odometer -->
    <td class="px-4 py-3 text-sm text-gray-700">
      <span v-if="odometer !== null">{{ odometer }} km</span>
      <span v-else class="text-gray-400">—</span>
    </td>

    <!-- Tank level -->
    <td class="px-4 py-3 text-sm text-gray-700">
      {{ record.type === 'load' ? '—' : `${(record as any).newLevel}L` }}
    </td>

    <!-- Timestamp -->
    <td class="px-4 py-3 text-sm text-gray-400">
      {{ formattedDate }}
    </td>
  </tr>
</template>
