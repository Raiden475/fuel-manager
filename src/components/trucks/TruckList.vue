<script setup lang="ts">
import type { Truck } from '../../models'
import TruckCard from './TruckCard.vue'

// Props: receive the full list of trucks from parent view
defineProps<{ trucks: Truck[] }>()

// Emits: bubble up edit and delete events to parent
const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div>
    <!-- Empty state -->
    <div
      v-if="trucks.length === 0"
      class="bg-white rounded-xl shadow p-8 text-center text-gray-400"
    >
      <p class="text-4xl mb-2">🚛</p>
      <p class="text-sm">No hay camionetas registradas</p>
    </div>

    <!-- Truck cards grid -->
    <div v-else class="grid grid-cols-1 gap-4">
      <TruckCard
        v-for="truck in trucks"
        :key="truck.id"
        :truck="truck"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
      />
    </div>
  </div>
</template>
