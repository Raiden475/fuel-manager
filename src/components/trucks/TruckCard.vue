<script setup lang="ts">
import type { Truck } from '../../models'

// Props: receive a single truck to display
defineProps<{ truck: Truck }>()

// Emits: notify parent when edit or delete is requested
const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div
    class="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-md transition-shadow"
  >
    <!-- Truck info -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
        🚛
      </div>
      <div>
        <p class="font-bold text-gray-800 text-sm">{{ truck.plate }}</p>
        <p class="text-gray-500 text-xs">{{ truck.brand }} {{ truck.model }}</p>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex gap-2">
      <button
        @click="emit('edit', truck.id)"
        class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors"
      >
        Editar
      </button>
      <button
        @click="emit('delete', truck.id)"
        class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>
