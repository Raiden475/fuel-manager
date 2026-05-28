<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const search = ref('')

// Map route paths to page titles
const pageTitles: Record<string, string> = {
  '/users': 'Usuarios',
  '/trucks': 'Camionetas',
  '/fuel/load': 'Cargar Combustible',
  '/fuel/refill': 'Recargar Tanque',
  '/records': 'Historial',
  '/settings/general': 'Configuracion',
  '/settings/team': 'Configuracion',
}

const pageTitle = () => pageTitles[route.path] ?? 'Fuel Manager'
</script>

<template>
  <header
    class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0"
  >
    <!-- Page title -->
    <h2 class="text-sm font-semibold text-gray-700">{{ pageTitle() }}</h2>

    <!-- Right side: search + avatar -->
    <div class="flex items-center gap-3">
      <!-- Search bar -->
      <div class="relative">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar..."
          class="w-48 text-xs bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 pl-7 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
        />
        <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
      </div>

      <!-- User avatar -->
      <div class="flex items-center gap-2">
        <div
          class="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white"
        >
          R
        </div>
        <span class="text-xs font-medium text-gray-700">Raiden475</span>
      </div>
    </div>
  </header>
</template>
