<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTruckStore } from '../../composables/useTruckStore'
import TruckForm from '../../components/trucks/TruckForm.vue'

const router = useRouter()
const route = useRoute()
const { getTruckById, updateTruck } = useTruckStore()

// Get truck id from route params
const truckId = Number(route.params.id)

// Find the truck to edit
const truck = computed(() => getTruckById(truckId))

// Handle form submission — update and go back to list
const handleSubmit = (data: { plate: string; model: string; brand: string }): void => {
  updateTruck(truckId, data)
  router.push('/trucks')
}
</script>

<template>
  <div>

    <!-- Truck not found -->
    <div v-if="!truck" class="text-center py-12">
      <p class="text-gray-400 text-lg">Camioneta no encontrada</p>
      <button
        @click="router.push('/trucks')"
        class="mt-4 text-blue-600 text-sm hover:underline"
      >
        Volver a la lista
      </button>
    </div>

    <!-- Edit form -->
    <div v-else>
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Editar Camioneta</h2>
        <p cla
