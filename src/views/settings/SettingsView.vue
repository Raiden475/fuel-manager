<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'

const route = useRoute()

// Settings submenu tabs
const tabs = [
  { path: '/settings/general', label: 'General' },
  { path: '/settings/team', label: 'Equipo' },
]

const isActive = (path: string): boolean => route.path === path
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Configuracion</h2>
      <p class="text-sm text-gray-500 mt-1">Administra las preferencias del sistema</p>
    </div>

    <!-- Nested navigation tabs -->
    <div class="flex gap-1 border-b border-gray-200 mb-6">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        class="px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px"
        :class="
          isActive(tab.path)
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-800'
        "
      >
        {{ tab.label }}
      </RouterLink>
    </div>

    <!-- Child route renders here — this is nested routing -->
    <RouterView />
  </div>
</template>
