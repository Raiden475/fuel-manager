<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTruckStore } from '../../composables/useTruckStore'
import TruckList from '../../components/trucks/TruckList.vue'

const router = useRouter()
const { trucks, deleteTruck } = useTruckStore()

// Navigate to edit view
const handleEdit = (id: number): void => {
  router.push(`/trucks/${id}/edit`)
}

// Delete truck from the list
const handleDelete = (id: number): void => {
  if (confirm('¿Seguro que querés eliminar esta camioneta?')) {
    deleteTruck(id)
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Camionetas</h2>
        <p class="text-sm text-gray-500 mt-1">{{ trucks.length }} camionetas registradas</p>
      </div>
      <button
        @click="router.push('/trucks/new')"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        + Nueva Camioneta
      </button>
    </div>

    <!-- Truck list component -->
    <TruckList :trucks="trucks" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>
