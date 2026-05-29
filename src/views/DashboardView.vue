<script setup lang="ts">
import AppSidebar from '../components/layout/AppSidebar.vue'
import AppHeader from '../components/layout/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar navigation -->
    <AppSidebar />

    <!-- Right side: header + content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top header bar -->
      <AppHeader />

      <!-- Page content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
