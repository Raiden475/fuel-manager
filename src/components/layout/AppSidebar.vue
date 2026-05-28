<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

// Navigation menu items
const menuItems = [
  { path: '/users', label: 'Usuarios', icon: '👤' },
  { path: '/trucks', label: 'Camionetas', icon: '🚛' },
  { path: '/fuel/load', label: 'Cargar Combustible', icon: '⛽' },
  { path: '/fuel/refill', label: 'Recargar Tanque', icon: '🛢️' },
  { path: '/records', label: 'Historial', icon: '📋' },
]

// Check if a menu item is currently active
const isActive = (path: string): boolean => route.path.startsWith(path)
</script>

<template>
  <aside class="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Logo / Title -->
    <div class="p-6 border-b border-gray-700">
      <h1 class="text-xl font-bold text-blue-400">⛽ Fuel Manager</h1>
      <p class="text-xs text-gray-400 mt-1">Sistema de Combustible</p>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
        :class="
          isActive(item.path)
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        "
      >
        <span class="text-lg">{{ item.icon }}</span>
        <span class="text-sm font-medium">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-700">
      <p class="text-xs text-gray-500 text-center">ITS Cipolletti — 2026</p>
    </div>
  </aside>
</template>
