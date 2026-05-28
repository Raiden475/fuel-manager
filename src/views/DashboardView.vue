<script setup lang="ts">
import AppSidebar from '../components/layout/AppSidebar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar navigation -->
    <AppSidebar />

    <!-- Main content area -->
    <main class="flex-1 p-8 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
