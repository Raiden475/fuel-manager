<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../composables/useUserStore'
import { useTruckStore } from '../composables/useTruckStore'
import { useFuelStore } from '../composables/useFuelStore'
import { useAuthStore } from '../composables/useAuthStore'

const router = useRouter()
const { users } = useUserStore()
const { trucks } = useTruckStore()
const { currentLevel, TANK_MAX, levelPercent, isLow, records } = useFuelStore()
const { currentUser } = useAuthStore()

// Computed: loads only (type = 'load')
const totalLoads = computed(() => records.value.filter((r) => r.type === 'load').length)

// Computed: tank status color
const tankColor = computed(() => {
  if (currentLevel.value <= 0) return 'red'
  if (isLow.value) return 'orange'
  return 'green'
})

// Computed: greeting based on time
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 18) return 'Buenas tardes'
  return 'Buenas noches'
})
</script>

<template>
  <div>
    <!-- Welcome header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">{{ greeting }}, {{ currentUser?.name }} 👋</h1>
      <p class="text-sm text-gray-400 mt-1">Resumen del sistema de combustible</p>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <!-- Tank level -->
      <div class="bg-white rounded-xl border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tanque</span>
          <span class="text-xl">🛢️</span>
        </div>
        <p
          class="text-3xl font-bold"
          :class="{
            'text-green-600': tankColor === 'green',
            'text-orange-500': tankColor === 'orange',
            'text-red-600': tankColor === 'red',
          }"
        >
          {{ currentLevel }}L
        </p>
        <p class="text-xs text-gray-400 mt-1">de {{ TANK_MAX }}L máximo</p>
        <!-- Tank bar -->
        <div class="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="{
              'bg-green-500': tankColor === 'green',
              'bg-orange-500': tankColor === 'orange',
              'bg-red-500': tankColor === 'red',
            }"
            :style="{ width: levelPercent + '%' }"
          ></div>
        </div>
        <!-- Low alert -->
        <p v-if="isLow" class="text-xs text-red-500 mt-2 font-medium">
          ⚠️ Nivel crítico — recargar tanque
        </p>
      </div>

      <!-- Users -->
      <div class="bg-white rounded-xl border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Choferes</span>
          <span class="text-xl">👤</span>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ users.length }}</p>
        <p class="text-xs text-gray-400 mt-1">usuarios registrados</p>
        <button @click="router.push('/users')" class="mt-3 text-xs text-blue-600 hover:underline">
          Ver todos →
        </button>
      </div>

      <!-- Trucks -->
      <div class="bg-white rounded-xl border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >Camionetas</span
          >
          <span class="text-xl">🚛</span>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ trucks.length }}</p>
        <p class="text-xs text-gray-400 mt-1">vehículos activos</p>
        <button @click="router.push('/trucks')" class="mt-3 text-xs text-blue-600 hover:underline">
          Ver todos →
        </button>
      </div>

      <!-- Total loads -->
      <div class="bg-white rounded-xl border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Cargas</span>
          <span class="text-xl">⛽</span>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ totalLoads }}</p>
        <p class="text-xs text-gray-400 mt-1">cargas realizadas</p>
        <button @click="router.push('/records')" class="mt-3 text-xs text-blue-600 hover:underline">
          Ver historial →
        </button>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="mb-8">
      <h2 class="text-sm font-semibold text-gray-700 mb-3">Acciones rápidas</h2>
      <div class="flex gap-3 flex-wrap">
        <button
          @click="router.push('/fuel/load')"
          class="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 active:scale-95 transition-all duration-150"
        >
          ⛽ Cargar combustible
        </button>
        <button
          @click="router.push('/fuel/refill')"
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all duration-150"
        >
          🛢️ Recargar tanque
        </button>
        <button
          @click="router.push('/records')"
          class="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all duration-150"
        >
          📋 Ver historial
        </button>
      </div>
    </div>

    <!-- Recent records -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-gray-800">Últimas operaciones</h2>
        <button @click="router.push('/records')" class="text-xs text-blue-600 hover:underline">
          Ver todas →
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="records.length === 0" class="p-8 text-center">
        <p class="text-2xl mb-2">📋</p>
        <p class="text-sm text-gray-400">No hay operaciones registradas aún</p>
      </div>

      <!-- Last 5 records -->
      <div v-else class="divide-y divide-gray-50">
        <div
          v-for="record in records.slice(0, 5)"
          :key="record.id"
          class="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <span class="text-base">{{ record.type === 'load' ? '⛽' : '🛢️' }}</span>
            <div>
              <p class="text-sm font-medium text-gray-800">
                {{ record.type === 'load' ? 'Carga de combustible' : 'Recarga del tanque' }}
              </p>
              <p class="text-xs text-gray-400">
                {{ new Date(record.timestamp).toLocaleString('es-AR') }}
              </p>
            </div>
          </div>
          <span
            class="text-sm font-semibold"
            :class="record.type === 'load' ? 'text-red-500' : 'text-green-600'"
          >
            {{ record.type === 'load' ? '-' : '+'
            }}{{ record.type === 'load' ? record.liters : record.litersAdded }}L
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
