<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFuelStore } from '../../composables/useFuelStore'

const { supplyHistory, addSupplyRefill, currentLevel, TANK_MAX, litersNeededToFill } =
  useFuelStore()

const driverName = ref('')
const truckPlate = ref('')
const company = ref('')
const remito = ref('')
const successMessage = ref('')
const errors = ref<string[]>([])

// Liters are auto-calculated — filled automatically with what the tank needs
const litersToFill = computed(() => litersNeededToFill.value)

const handleSubmit = (): void => {
  errors.value = []
  if (!driverName.value.trim()) errors.value.push('Ingresá el nombre del chofer externo')
  if (!truckPlate.value.trim()) errors.value.push('Ingresá la patente del camión cisterna')
  if (!company.value.trim()) errors.value.push('Ingresá la empresa transportista')
  if (!remito.value.trim()) errors.value.push('Ingresá el número de remito')
  if (litersToFill.value <= 0)
    errors.value.push('El tanque ya está lleno — no se puede registrar una recarga')
  if (errors.value.length > 0) return

  const added = addSupplyRefill({
    driverName: driverName.value.trim(),
    truckPlate: truckPlate.value.trim().toUpperCase(),
    company: company.value.trim(),
    remito: remito.value.trim(),
    litersDelivered: litersToFill.value,
  })

  successMessage.value = `✅ Se registraron ${added}L. Nivel actual: ${currentLevel.value}L`
  driverName.value = ''
  truckPlate.value = ''
  company.value = ''
  remito.value = ''
  setTimeout(() => {
    successMessage.value = ''
  }, 4000)
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-gray-900">Historial del Tanque Principal</h1>
      <p class="text-sm text-gray-400 mt-0.5">Registrá recargas de camiones cisterna externos</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Form -->
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <h2 class="text-sm font-semibold text-gray-800 mb-4">Nueva recarga de cisterna</h2>

        <!-- Tank level indicator -->
        <div class="bg-gray-50 rounded-lg p-3 mb-4">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>Nivel actual del tanque</span>
            <span
              class="font-medium"
              :class="currentLevel < 50 ? 'text-red-600' : 'text-green-600'"
            >
              {{ currentLevel }}L / {{ TANK_MAX }}L
            </span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :class="currentLevel < 50 ? 'bg-red-500' : 'bg-green-500'"
              :style="{ width: Math.round((currentLevel / TANK_MAX) * 100) + '%' }"
            ></div>
          </div>
        </div>

        <!-- Auto-calculated liters box -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p class="text-xs text-blue-500 mb-1">Litros necesarios para llenar el tanque</p>
          <p class="text-2xl font-bold text-blue-700">{{ litersToFill }}L</p>
          <p class="text-xs text-blue-400 mt-1">
            Este valor se calcula automáticamente — el cisterna debe traer exactamente esta cantidad
          </p>
        </div>

        <!-- Tank full warning -->
        <div
          v-if="litersToFill <= 0"
          class="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm px-4 py-3 rounded-lg mb-4"
        >
          ⚠️ El tanque está lleno — no se puede registrar una recarga
        </div>

        <div
          v-if="successMessage"
          class="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4"
        >
          {{ successMessage }}
        </div>

        <ul
          v-if="errors.length > 0"
          class="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4 space-y-1"
        >
          <li v-for="e in errors" :key="e">• {{ e }}</li>
        </ul>

        <!-- Manual fields -->
        <div class="mb-4">
          <label class="block text-xs font-medium text-gray-600 mb-1">Chofer externo</label>
          <input
            v-model="driverName"
            type="text"
            placeholder="Ej: Juan Pérez"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-xs font-medium text-gray-600 mb-1">Patente cisterna</label>
          <input
            v-model="truckPlate"
            type="text"
            placeholder="Ej: AB123CD"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-xs font-medium text-gray-600 mb-1">Empresa transportista</label>
          <input
            v-model="company"
            type="text"
            placeholder="Ej: PAE Logística"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <!-- Remito number -->
        <div class="mb-6">
          <label class="block text-xs font-medium text-gray-600 mb-1"> Número de remito </label>
          <input
            v-model="remito"
            type="text"
            placeholder="Ej: REM-00123"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          @click="handleSubmit"
          :disabled="litersToFill <= 0"
          class="w-full bg-green-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Registrar recarga
        </button>
      </div>

      <!-- History -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100">
          <h2 class="text-sm font-semibold text-gray-800">Historial de recargas</h2>
          <p class="text-xs text-gray-400 mt-0.5">
            {{ supplyHistory.length }} recargas registradas
          </p>
        </div>

        <div v-if="supplyHistory.length === 0" class="p-8 text-center">
          <p class="text-2xl mb-2">🛢️</p>
          <p class="text-sm text-gray-400">No hay recargas registradas</p>
        </div>

        <div v-else class="divide-y divide-gray-50">
          <div
            v-for="entry in supplyHistory"
            :key="entry.timestamp"
            class="px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-medium text-gray-800">{{ entry.driverName }}</p>
                <p class="text-xs text-gray-400 mt-0.5">
                  {{ entry.truckPlate }} · {{ entry.company }}
                </p>
                <p class="text-xs text-gray-400">
                  Remito: <span class="font-medium">{{ entry.remito }}</span>
                </p>
                <p class="text-xs text-gray-400">
                  {{ new Date(entry.timestamp).toLocaleString('es-AR') }}
                </p>
              </div>
              <span class="text-sm font-bold text-green-600"> +{{ entry.litersDelivered }}L </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
