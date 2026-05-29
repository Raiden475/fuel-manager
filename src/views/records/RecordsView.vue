<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFuelStore } from '../../composables/useFuelStore'
import { useUserStore } from '../../composables/useUserStore'
import { useTruckStore } from '../../composables/useTruckStore'
import type { FuelLoad } from '../../models'

const { records, currentLevel, TANK_MAX } = useFuelStore()
const { users, getUserById } = useUserStore()
const { trucks, getTruckById } = useTruckStore()

// Filter state
const activeFilter = ref<'all' | 'load' | 'refill'>('all')
const searchText = ref('')
const selectedDriverId = ref<number | 'all'>('all')
const selectedTruckId = ref<number | 'all'>('all')

// Computed: filtered records
const filteredRecords = computed(() => {
  return records.value.filter((r) => {
    // Filter by type
    if (activeFilter.value !== 'all' && r.type !== activeFilter.value) return false

    // Driver and truck filters only apply to loads
    if (r.type === 'load') {
      const load = r as FuelLoad
      if (selectedDriverId.value !== 'all' && load.driverId !== selectedDriverId.value) return false
      if (selectedTruckId.value !== 'all' && load.truckId !== selectedTruckId.value) return false

      // Text search
      if (searchText.value) {
        const driver = getUserById(load.driverId)
        const truck = getTruckById(load.truckId)
        const query = searchText.value.toLowerCase()
        return (
          driver?.name.toLowerCase().includes(query) || truck?.plate.toLowerCase().includes(query)
        )
      }
    } else if (activeFilter.value === 'load') {
      return false
    }

    return true
  })
})

// Computed: stats for selected driver
const driverStats = computed(() => {
  if (selectedDriverId.value === 'all') return null
  const loads = records.value.filter(
    (r) => r.type === 'load' && (r as FuelLoad).driverId === selectedDriverId.value,
  ) as FuelLoad[]
  const totalLiters = loads.reduce((sum, r) => sum + r.liters, 0)
  const trucksUsed = [...new Set(loads.map((r) => r.truckId))]
  return { totalLoads: loads.length, totalLiters, trucksUsed }
})

// Computed: stats for selected truck
const truckStats = computed(() => {
  if (selectedTruckId.value === 'all') return null
  const loads = records.value.filter(
    (r) => r.type === 'load' && (r as FuelLoad).truckId === selectedTruckId.value,
  ) as FuelLoad[]
  const totalLiters = loads.reduce((sum, r) => sum + r.liters, 0)
  const driversUsed = [...new Set(loads.map((r) => r.driverId))]
  return { totalLoads: loads.length, totalLiters, driversUsed }
})

// Computed: total loaded liters
const totalLoaded = computed(() =>
  records.value
    .filter((r) => r.type === 'load')
    .reduce((sum, r) => sum + (r as FuelLoad).liters, 0),
)

// Reset filters
const resetFilters = () => {
  activeFilter.value = 'all'
  searchText.value = ''
  selectedDriverId.value = 'all'
  selectedTruckId.value = 'all'
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Historial</h1>
        <p class="text-sm text-gray-400 mt-0.5">{{ records.length }} operaciones registradas</p>
      </div>
      <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
        <span class="text-sm">🛢️</span>
        <div>
          <p class="text-xs text-gray-400">Nivel actual</p>
          <p
            class="text-sm font-bold"
            :class="currentLevel < 50 ? 'text-red-600' : 'text-green-600'"
          >
            {{ currentLevel }}L / {{ TANK_MAX }}L
          </p>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-3 gap-3 mb-5">
      <div class="bg-white rounded-xl border border-gray-200 p-4 text-center">
        <p class="text-2xl font-bold text-gray-900">{{ records.length }}</p>
        <p class="text-xs text-gray-400 mt-1">Total operaciones</p>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 p-4 text-center">
        <p class="text-2xl font-bold text-red-500">{{ totalLoaded }}L</p>
        <p class="text-xs text-gray-400 mt-1">Total cargado</p>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 p-4 text-center">
        <p class="text-2xl font-bold text-green-600">{{ currentLevel }}L</p>
        <p class="text-xs text-gray-400 mt-1">En el tanque</p>
      </div>
    </div>

    <!-- Driver stats card -->
    <div v-if="driverStats" class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
      <p class="text-sm font-semibold text-blue-800 mb-2">
        📊 Resumen de {{ getUserById(selectedDriverId as number)?.name }}
      </p>
      <div class="flex gap-6">
        <div>
          <p class="text-xl font-bold text-blue-700">{{ driverStats.totalLoads }}</p>
          <p class="text-xs text-blue-500">cargas realizadas</p>
        </div>
        <div>
          <p class="text-xl font-bold text-blue-700">{{ driverStats.totalLiters }}L</p>
          <p class="text-xs text-blue-500">litros totales</p>
        </div>
        <div>
          <p class="text-xl font-bold text-blue-700">{{ driverStats.trucksUsed.length }}</p>
          <p class="text-xs text-blue-500">camionetas distintas</p>
        </div>
      </div>
      <p class="text-xs text-blue-500 mt-2">
        Camionetas usadas:
        {{ driverStats.trucksUsed.map((id) => getTruckById(id)?.plate).join(', ') }}
      </p>
    </div>

    <!-- Truck stats card -->
    <div v-if="truckStats" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
      <p class="text-sm font-semibold text-green-800 mb-2">
        📊 Resumen de {{ getTruckById(selectedTruckId as number)?.plate }} —
        {{ getTruckById(selectedTruckId as number)?.brand }}
        {{ getTruckById(selectedTruckId as number)?.model }}
      </p>
      <div class="flex gap-6">
        <div>
          <p class="text-xl font-bold text-green-700">{{ truckStats.totalLoads }}</p>
          <p class="text-xs text-green-500">cargas recibidas</p>
        </div>
        <div>
          <p class="text-xl font-bold text-green-700">{{ truckStats.totalLiters }}L</p>
          <p class="text-xs text-green-500">litros totales</p>
        </div>
        <div>
          <p class="text-xl font-bold text-green-700">{{ truckStats.driversUsed.length }}</p>
          <p class="text-xs text-green-500">choferes distintos</p>
        </div>
      </div>
      <p class="text-xs text-green-500 mt-2">
        Choferes: {{ truckStats.driversUsed.map((id) => getUserById(id)?.name).join(', ') }}
      </p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl border border-gray-200 p-3 mb-4 space-y-3">
      <!-- Row 1: type + search -->
      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex gap-1">
          <button
            v-for="f in [
              { key: 'all', label: 'Todos' },
              { key: 'load', label: '⛽ Cargas' },
              { key: 'refill', label: '🛢️ Recargas' },
            ]"
            :key="f.key"
            @click="activeFilter = f.key as 'all' | 'load' | 'refill'"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 active:scale-95"
            :class="
              activeFilter === f.key
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
          >
            {{ f.label }}
          </button>
        </div>

        <div class="relative flex-1 min-w-40">
          <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
          <input
            v-model="searchText"
            type="text"
            placeholder="Buscar chofer o patente..."
            class="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <span class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          {{ filteredRecords.length }} resultado{{ filteredRecords.length !== 1 ? 's' : '' }}
        </span>

        <button
          v-if="
            selectedDriverId !== 'all' ||
            selectedTruckId !== 'all' ||
            searchText ||
            activeFilter !== 'all'
          "
          @click="resetFilters"
          class="text-xs text-red-500 hover:underline"
        >
          Limpiar filtros
        </button>
      </div>

      <!-- Row 2: driver + truck selects -->
      <div class="flex gap-3 flex-wrap">
        <!-- Filter by driver -->
        <div class="flex-1 min-w-40">
          <label class="block text-xs text-gray-400 mb-1">Filtrar por chofer</label>
          <select
            v-model="selectedDriverId"
            class="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los choferes</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>

        <!-- Filter by truck -->
        <div class="flex-1 min-w-40">
          <label class="block text-xs text-gray-400 mb-1">Filtrar por camioneta</label>
          <select
            v-model="selectedTruckId"
            class="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Todas las camionetas</option>
            <option v-for="truck in trucks" :key="truck.id" :value="truck.id">
              {{ truck.plate }} — {{ truck.brand }} {{ truck.model }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Records table -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div v-if="filteredRecords.length === 0" class="p-12 text-center">
        <p class="text-3xl mb-3">📋</p>
        <p class="text-sm font-medium text-gray-500">No hay registros</p>
        <p class="text-xs text-gray-400 mt-1">Intentá con otro filtro</p>
      </div>

      <table v-else class="w-full">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Tipo
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Detalle
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Litros
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Fecha y hora
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="record in filteredRecords"
            :key="record.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-3">
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                :class="
                  record.type === 'load' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
                "
              >
                {{ record.type === 'load' ? '⛽ Carga' : '🛢️ Recarga' }}
              </span>
            </td>
            <td class="px-4 py-3">
              <template v-if="record.type === 'load'">
                <p class="text-sm text-gray-800">
                  {{ getUserById(record.driverId)?.name ?? 'Chofer desconocido' }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ getTruckById(record.truckId)?.plate }} · {{ record.odometer }} km
                </p>
              </template>
              <template v-else>
                <p class="text-sm text-gray-800">Recarga del tanque</p>
                <p class="text-xs text-gray-400">
                  {{ record.previousLevel }}L → {{ record.newLevel }}L
                </p>
              </template>
            </td>
            <td class="px-4 py-3">
              <span
                class="text-sm font-bold"
                :class="record.type === 'load' ? 'text-red-500' : 'text-green-600'"
              >
                {{ record.type === 'load' ? '-' : '+'
                }}{{ record.type === 'load' ? record.liters : record.litersAdded }}L
              </span>
            </td>
            <td class="px-4 py-3 text-xs text-gray-400">
              {{ new Date(record.timestamp).toLocaleString('es-AR') }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredRecords.length > 0" class="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <p class="text-xs text-gray-400">
          {{ filteredRecords.length }} registro{{ filteredRecords.length !== 1 ? 's' : '' }}
        </p>
      </div>
    </div>
  </div>
</template>
