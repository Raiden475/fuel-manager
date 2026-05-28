<script setup lang="ts">
import { useUserStore } from '../../composables/useUserStore'
import { useRouter } from 'vue-router'

const { users } = useUserStore()
const router = useRouter()
</script>

<template>
  <div class="bg-white rounded-xl shadow overflow-hidden max-w-lg">
    <div class="p-4 border-b border-gray-100 flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-800">Equipo</h3>
      <button
        @click="router.push('/users/new')"
        class="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Agregar
      </button>
    </div>

    <!-- Team members list -->
    <div class="divide-y divide-gray-100">
      <div
        v-for="user in users"
        :key="user.id"
        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
        @click="router.push(`/users/${user.id}`)"
      >
        <!-- Avatar -->
        <div
          class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600"
        >
          {{ user.name.charAt(0) }}
        </div>
        <!-- Info -->
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-800">{{ user.name }}</p>
          <p class="text-xs text-gray-400">{{ user.email }}</p>
        </div>
        <!-- Arrow -->
        <span class="text-gray-300 text-sm">→</span>
      </div>
    </div>
  </div>
</template>
