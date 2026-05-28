<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

// Controls whether Settings submenu is open
const settingsOpen = ref(false)

// Main menu items
const menuItems = [
  { path: '/users', label: 'Usuarios', icon: '👤' },
  { path: '/trucks', label: 'Camionetas', icon: '🚛' },
  { path: '/fuel/load', label: 'Cargar Combustible', icon: '⛽' },
  { path: '/fuel/refill', label: 'Recargar Tanque', icon: '🛢️' },
  { path: '/records', label: 'Historial', icon: '📋' },
]

// Settings submenu items — nested routes
const settingsItems = [
  { path: '/settings/general', label: 'General' },
  { path: '/settings/team', label: 'Equipo' },
]

// Check if a path is active
const isActive = (path: string): boolean => route.path.startsWith(path)

// Check if settings section is active
const settingsActive = (): boolean => route.path.startsWith('/settings')
</script>

<template>
  <aside class="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Logo -->
    <div class="p-5 border-b border-gray-700">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">
          ⛽
        </div>
        <div>
          <h1 class="text-sm font-bold text-white">Fuel Manager</h1>
          <p class="text-xs text-gray-400">Sistema de Combustible</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
      <!-- Regular menu items -->
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-sm"
        :class="
          isActive(item.path)
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        "
      >
        <span class="text-base">{{ item.icon }}</span>
        <span class="font-medium">{{ item.label }}</span>
      </RouterLink>

      <!-- Divider -->
      <div class="border-t border-gray-700 my-2"></div>

      <!-- Settings — collapsible with nested routes -->
      <button
        @click="settingsOpen = !settingsOpen"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-sm"
        :class="
          settingsActive()
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        "
      >
        <span class="text-base">⚙️</span>
        <span class="font-medium flex-1 text-left">Configuracion</span>
        <!-- Arrow indicator -->
        <span
          class="text-xs transition-transform duration-200"
          :class="settingsOpen || settingsActive() ? 'rotate-90' : ''"
        >
          ›
        </span>
      </button>

      <!-- Settings submenu — nested route links -->
      <div
        v-if="settingsOpen || settingsActive()"
        class="ml-4 space-y-1 border-l border-gray-700 pl-3"
      >
        <RouterLink
          v-for="item in settingsItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
          :class="
            route.path === item.path
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          "
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>

    <!-- User info footer -->
    <div class="p-4 border-t border-gray-700">
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold"
        >
          R
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium text-white truncate">Raiden475</p>
          <p class="text-xs text-gray-400 truncate">ITS Cipolletti</p>
        </div>
      </div>
    </div>
  </aside>
</template>
