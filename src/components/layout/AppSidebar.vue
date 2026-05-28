<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '../../composables/useAuthStore'

const route = useRoute()
const { isAdmin } = useAuthStore()
const settingsOpen = ref(false)

// Admin sees everything — operator only sees fuel and records
const menuItems = [
  { path: '/users', label: 'Usuarios', icon: '👤', adminOnly: true },
  { path: '/trucks', label: 'Camionetas', icon: '🚛', adminOnly: true },
  { path: '/fuel/load', label: 'Cargar Combustible', icon: '⛽', adminOnly: false },
  { path: '/fuel/refill', label: 'Recargar Tanque', icon: '🛢️', adminOnly: false },
  { path: '/records', label: 'Historial', icon: '📋', adminOnly: false },
]

const settingsItems = [
  { path: '/settings/general', label: 'General' },
  { path: '/settings/team', label: 'Equipo' },
]

const isActive = (path: string): boolean => route.path.startsWith(path)
const settingsActive = (): boolean => route.path.startsWith('/settings')

// Filter menu items based on role
const visibleItems = menuItems.filter((item) => !item.adminOnly || isAdmin.value)
</script>

<template>
  <aside class="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col">
    <!-- Logo -->
    <div class="px-4 py-4 border-b border-gray-100">
      <div class="flex items-center gap-2.5">
        <div
          class="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-xs text-white"
        >
          ⛽
        </div>
        <span class="text-sm font-semibold text-gray-900">Fuel Manager</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-3 space-y-0.5">
      <RouterLink
        v-for="item in visibleItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
        :class="
          isActive(item.path)
            ? 'bg-gray-100 text-gray-900 font-medium'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        "
      >
        <span class="text-base">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>

      <!-- Settings — admin only -->
      <template v-if="isAdmin">
        <div class="pt-2 pb-1">
          <p class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sistema</p>
        </div>

        <button
          @click="settingsOpen = !settingsOpen"
          class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
          :class="
            settingsActive()
              ? 'bg-gray-100 text-gray-900 font-medium'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          "
        >
          <span class="text-base">⚙️</span>
          <span class="flex-1 text-left">Configuracion</span>
          <span
            class="text-gray-400 text-xs transition-transform duration-200"
            :class="settingsOpen || settingsActive() ? 'rotate-90' : ''"
            >›</span
          >
        </button>

        <div
          v-if="settingsOpen || settingsActive()"
          class="ml-6 space-y-0.5 border-l border-gray-200 pl-3"
        >
          <RouterLink
            v-for="item in settingsItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors"
            :class="
              route.path === item.path
                ? 'text-gray-900 font-medium bg-gray-100'
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
            "
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </template>
    </nav>

    <!-- User footer -->
    <div class="px-4 py-3 border-t border-gray-100">
      <div class="flex items-center gap-2.5">
        <div
          class="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white"
        >
          R
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium text-gray-900 truncate">Raiden475</p>
          <p class="text-xs text-gray-400 truncate">ITS Cipolletti</p>
        </div>
      </div>
    </div>
  </aside>
</template>
