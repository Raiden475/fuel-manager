<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTruckStore } from '../../composables/useTruckStore'
import TruckForm from '../../components/trucks/TruckForm.vue'

const router = useRouter()
const { addTruck } = useTruckStore()

// Handle form submission — add truck and go back to list
const handleSubmit = (data: { plate: string; model: string; brand: string }): void => {
  addTruck(data)
  router.push('/trucks')
}
</script>

<template>
  <div>

    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Nueva Camioneta</h2>
      <p class="text-sm text-gray-500 mt-1">Registrá una nueva camioneta en el sistema</p>
    </div>

    <!-- Reusable form component -->
    <TruckForm
      submit-label="Registrar Camioneta"
      @submit="handleSubmit"
      @cancel="router.p
