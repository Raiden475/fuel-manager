<script setup lang="ts">
import { ref } from 'vue'
import TankRefillForm from '../../components/fuel/TankRefillForm.vue'
import TankGauge from '../../components/layout/TankGauge.vue'
import { useFuelStore } from '../../composables/useFuelStore'

const { currentLevel, TANK_MAX } = useFuelStore()

const showForm = ref(true)

const handleConfirm = () => {
  showForm.value = false
}

const handleNewRefill = () => {
  showForm.value = true
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-1">Recargar Tanque</h2>
    <p class="text-sm text-gray-500 mb-6">Cargá combustible al tanque principal desde el camión cisterna.</p>

    <!-- Tank gauge -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <TankGauge :current-level="currentLevel" :max-level="TANK_MAX" />
    </div>

    <!-- Refill form -->
    <TankRefillForm
      v-if="showForm"
      @confirm="handleConfirm"
      @cancel="showForm = false"
    />

    <!-- After refill -->
    <div v-else class="text-center space-y-4">
      <div class="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
        ✓ Recarga registrada correctamente.
      </div>
      <button
        class="bg-blue-600 text-white rounded-md px-6 py-2 text-sm font-medium hover:bg-blue-700 transition"
        @click="handleNewRefill"
      >
        Nueva recarga
      </button>
    </div>
  </div>
</template>
