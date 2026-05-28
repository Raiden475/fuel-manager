<script setup lang="ts">
import { ref } from 'vue'
import FuelLoadForm from '../../components/fuel/FuelLoadForm.vue'
import TankGauge from '../../components/layout/TankGauge.vue'
import { useFuelStore } from '../../composables/useFuelStore'
import type { FuelLoad } from '../../models'

const { addFuelLoad, currentLevel, TANK_MAX } = useFuelStore()

const successMessage = ref<string | null>(null)
const showForm = ref(true)

// Handle confirmed load — update tank and show result
const handleSubmit = (data: Omit<FuelLoad, 'id' | 'type' | 'timestamp'>) => {
  const ok = addFuelLoad(data)
  if (ok) {
    successMessage.value = `Se cargaron ${data.liters}L correctamente. Nivel actual: ${currentLevel.value}L`
    showForm.value = false
  }
}

const handleNewLoad = () => {
  successMessage.value = null
  showForm.value = true
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-1">Cargar Combustible</h2>
    <p class="text-sm text-gray-500 mb-6">Registrá la carga de combustible a una camioneta.</p>

    <!-- Tank gauge -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <TankGauge :current-level="currentLevel" :max-level="TANK_MAX" />
    </div>

    <!-- Success confirmation -->
    <div v-if="!showForm" class="text-center space-y-4">
      <div class="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
        ✓ {{ successMessage }}
      </div>
      <button
        class="bg-blue-600 text-white rounded-md px-6 py-2 text-sm font-medium hover:bg-blue-700 transition"
        @click="handleNewLoad"
      >
        Nueva carga
      </button>
    </div>

    <!-- Fuel load form -->
    <FuelLoadForm
      v-else
      @submit="handleSubmit"
      @cancel="showForm = false"
    />
  </div>
</template>
