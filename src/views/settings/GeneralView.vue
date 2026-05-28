<script setup lang="ts">
// General settings — system information
</script>

<template>
  <div class="bg-white rounded-xl shadow p-6 max-w-lg">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Informacion General</h3>

    <div class="space-y-4">
      <div class="flex justify-between items-center py-3 border-b border-gray-100">
        <span class="text-sm text-gray-500">Sistema</span>
        <span class="text-sm font-medium text-gray-800">Fuel Manager v1.0</span>
      </div>
      <div class="flex justify-between items-center py-3 border-b border-gray-100">
        <span class="text-sm text-gray-500">Capacidad del tanque</span>
        <span class="text-sm font-medium text-gray-800">500 litros</span>
      </div>
      <div class="flex justify-between items-center py-3 border-b border-gray-100">
        <span class="text-sm text-gray-500">Alerta de nivel bajo</span>
        <span class="text-sm font-medium text-red-600">menos de 50 litros</span>
      </div>
      <div class="flex justify-between items-center py-3">
        <span class="text-sm text-gray-500">Institucion</span>
        <span class="text-sm font-medium text-gray-800">ITS Cipolletti</span>
      </div>
    </div>
  </div>
</template>
