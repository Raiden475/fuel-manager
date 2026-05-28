<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFuelStore } from '../../composables/useFuelStore'

const emit = defineEmits<{
  confirm: [litersAdded: number]
  cancel: []
}>()

const { currentLevel, litersNeededToFill, refillTank } = useFuelStore()

const litersAvailable = ref<number | null>(null)
const result = ref<{ prev: number; added: number; newLevel: number } | null>(null)
const error = ref<string | null>(null)

// Computed: how many liters will actually be added (capped at tank space)
const litersToAdd = computed(() => {
  if (!litersAvailable.value || litersAvailable.value <= 0) return 0
  return Math.min(litersAvailable.value, litersNeededToFill.value)
})

const handleConfirm = () => {
  error.value = null

  if (!litersAvailable.value || litersAvailable.value <= 0) {
    error.value = 'Ingresá los litros disponibles en el camión cisterna.'
    return
  }

  const prev = currentLevel.value
  const added = refillTank(litersAvailable.value)
  result.value = { prev, added, newLevel: currentLevel.value }
  emit('confirm', added)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Error -->
    <p
      v-if="error"
      class="bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 text-sm"
    >
      • {{ error }}
    </p>

    <!-- Result after refill -->
    <div
      v-if="result"
      class="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-sm space-y-1"
    >
      <p>✓ Recarga completada</p>
      <p>Nivel anterior: <strong>{{ result.prev }}L</strong></p>
      <p>Litros agregados: <strong>{{ result.added }}L</strong></p>
      <p>Nivel nuevo: <strong>{{ result.newLevel }}L</strong></p>
    </div>

    <div v-else>
      <!-- Liters available in supply truck -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Litros disponibles en el camión cisterna
          </label>
          <input
            v-model.number="litersAvailable"
            type="number"
            min="1"
            placeholder="Ej: 200"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Preview of what will actually be added -->
        <div
          v-if="litersAvailable && litersAvailable > 0"
          class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800"
        >
          <p>Espacio disponible en tanque: <strong>{{ litersNeededToFill }}L</strong></p>
          <p>Se agregarán efectivamente: <strong>{{ litersToAdd }}L</strong></p>
          <p v-if="litersAvailable > litersNeededToFill" class="text-orange-600 mt-1">
            ⚠ El camión trae más litros de los que caben — se cargará solo lo necesario.
          </p>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-3 pt-2">
          <button
            type="button"
            :disabled="!litersAvailable || litersAvailable <= 0"
            class="flex-1 bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            @click="handleConfirm"
          >
            Confirmar recarga
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
    </div>
  </div>
</template>
