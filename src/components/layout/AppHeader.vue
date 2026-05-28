<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../composables/useAuthStore'

const route = useRoute()
const router = useRouter()
const { currentUser, logout } = useAuthStore()

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

// Handle logout
const handleLogout = (): void => {
  logout()
  router.push('/login')
}
</script>

<template>
  <header
    class="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0"
  >
    <!-- Page title -->
    <h2 class="text-sm font-semibold text-gray-700">{{ pageTitle() }}</h2>

    <!-- Right side -->
    <div class="flex items-center gap-3">
      <!-- Search bar -->
      <div class="relative">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar..."
          class="w-48 text-xs bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 pl-7 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors"
        />
        <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
      </div>

      <!-- Role badge -->
      <span
        class="text-xs px-2 py-1 rounded-full font-medium"
        :class="
          currentUser?.role === 'admin'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-green-100 text-green-700'
        "
      >
        {{ currentUser?.role === 'admin' ? 'Admin' : 'Operador' }}
      </span>

      <!-- User avatar + name -->
      <div class="flex items-center gap-2">
        <div
          class="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white"
        >
          {{ currentUser?.name.charAt(0) }}
        </div>
        <span class="text-xs font-medium text-gray-700">{{ currentUser?.name }}</span>
      </div>

      <!-- Logout button -->
      <button
        @click="handleLogout"
        class="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
      >
        Salir
      </button>
    </div>
  </header>
</template>
